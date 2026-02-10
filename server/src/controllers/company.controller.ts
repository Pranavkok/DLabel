import type { Response } from "express";
import path from "path";
import fs from "fs";
import AdmZip from "adm-zip";
import prisma from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";
import type { AuthRequest } from "../middleware/auth.js";
import type { DataStatus } from "../generated/prisma/client.js";

// ============================================
// GET /api/company/dashboard
// ============================================
export async function getDashboard(req: AuthRequest, res: Response) {
    try {
        const companyId = req.companyId!;

        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!company) return res.status(404).json({ error: "Company not found" });

        const posts = await prisma.post.findMany({
            where: { companyId },
        });

        // Aggregate stats
        const totalPosts = posts.length;
        const activePosts = posts.filter((p) => p.status === "ACTIVE").length;
        const completedPosts = posts.filter((p) => p.status === "COMPLETED").length;
        const totalImages = posts.reduce((sum, p) => sum + p.totalImages, 0);
        const totalLocked = posts.reduce(
            (sum, p) => sum + Number(p.amountLocked),
            0
        );

        // Count labeled and verified images across all posts
        const labeledImages = await prisma.data.count({
            where: {
                post: { companyId },
                status: { not: "UNLABELED" },
            },
        });

        const verifiedImages = await prisma.data.count({
            where: {
                post: { companyId },
                status: "VERIFIED",
            },
        });

        return res.json({
            company: {
                id: company.id,
                name: company.name,
                email: company.email,
                walletAddress: company.walletAddress,
            },
            stats: {
                totalPosts,
                activePosts,
                completedPosts,
                totalImages,
                labeledImages,
                verifiedImages,
                totalEthLocked: totalLocked,
            },
        });
    } catch (error) {
        console.error("Get company dashboard error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/company/post/create
// ============================================
export async function createPost(req: AuthRequest, res: Response) {
    try {
        const companyId = req.companyId!;
        const {
            datasetName,
            labels,
            instructions,
            amountLocked,
            verificationRequired,
            verificationDeadline,
        } = req.body;

        if (!datasetName || !labels || !amountLocked) {
            return res.status(400).json({
                error: "datasetName, labels, and amountLocked are required",
            });
        }

        const labelsArr = labels as string[];
        if (!Array.isArray(labelsArr) || labelsArr.length < 2) {
            return res.status(400).json({
                error: "labels must be an array with at least 2 options",
            });
        }

        const amount = parseFloat(amountLocked as string);
        const labelingPool = (amount * 70) / 100;
        const verificationPool = amount - labelingPool;

        const post = await prisma.post.create({
            data: {
                companyId,
                datasetName: datasetName as string,
                totalImages: 0, // Will be updated when images are uploaded
                amountLocked: amount,
                labelingPool,
                verificationPool,
                labels: labelsArr,
                instructions: (instructions as string) || null,
                verificationRequired: verificationRequired !== false,
                verificationDeadline: verificationDeadline
                    ? new Date(verificationDeadline as string)
                    : null,
            },
        });

        return res.status(201).json({
            post: {
                id: post.id,
                datasetName: post.datasetName,
                amountLocked: Number(post.amountLocked),
                labelingPool: Number(post.labelingPool),
                verificationPool: Number(post.verificationPool),
                labels: post.labels,
                status: post.status,
                createdAt: post.createdAt,
            },
        });
    } catch (error) {
        console.error("Create post error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/company/post/images
// ============================================
export async function uploadImages(req: AuthRequest, res: Response) {
    try {
        const companyId = req.companyId!;
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({ error: "postId is required" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "ZIP file is required" });
        }

        // Verify the post belongs to this company
        const post = await prisma.post.findFirst({
            where: { id: postId as string, companyId },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Extract ZIP
        const zip = new AdmZip(req.file.path);
        const zipEntries = zip.getEntries();

        // Filter image files
        const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"];
        const imageEntries = zipEntries.filter((entry: AdmZip.IZipEntry) => {
            const ext = path.extname(entry.entryName).toLowerCase();
            return !entry.isDirectory && imageExtensions.includes(ext);
        });

        if (imageEntries.length === 0) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "No image files found in ZIP" });
        }

        // Extract images to temp directory
        const extractDir = path.join(
            process.cwd(),
            "uploads",
            `extract-${Date.now()}`
        );
        fs.mkdirSync(extractDir, { recursive: true });

        // Upload each image to Cloudinary and create Data records
        const uploadedImages: Array<{ id: string; imageUrl: string }> = [];
        const tokenValuePerImage =
            Number(post.labelingPool) / imageEntries.length;

        for (const entry of imageEntries) {
            try {
                // Extract to temp file
                const tempPath = path.join(extractDir, entry.entryName.replace(/\//g, "_"));
                fs.writeFileSync(tempPath, entry.getData());

                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(tempPath, {
                    folder: `datalabel/${postId as string}`,
                    resource_type: "image",
                });

                // Create Data record
                const data = await prisma.data.create({
                    data: {
                        postId: postId as string,
                        imageUrl: result.secure_url,
                        tokenValue: tokenValuePerImage,
                    },
                });

                uploadedImages.push({ id: data.id, imageUrl: data.imageUrl });

                // Clean up temp file
                fs.unlinkSync(tempPath);
            } catch (uploadError) {
                console.error(`Failed to upload ${entry.entryName}:`, uploadError);
            }
        }

        // Update post with total images count
        await prisma.post.update({
            where: { id: postId as string },
            data: { totalImages: uploadedImages.length },
        });

        // Clean up
        fs.rmSync(extractDir, { recursive: true, force: true });
        fs.unlinkSync(req.file.path);

        return res.status(201).json({
            success: true,
            totalUploaded: uploadedImages.length,
            postId,
            tokenValuePerImage,
            images: uploadedImages,
        });
    } catch (error) {
        console.error("Upload images error:", error);
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// GET /api/company/posts
// ============================================
export async function getPosts(req: AuthRequest, res: Response) {
    try {
        const companyId = req.companyId!;

        const posts = await prisma.post.findMany({
            where: { companyId },
            orderBy: { createdAt: "desc" },
        });

        // Get labeling progress per post
        const postsWithProgress = await Promise.all(
            posts.map(async (post) => {
                const labeled = await prisma.data.count({
                    where: { postId: post.id, status: { not: "UNLABELED" } },
                });
                const verified = await prisma.data.count({
                    where: { postId: post.id, status: "VERIFIED" },
                });

                return {
                    id: post.id,
                    datasetName: post.datasetName,
                    totalImages: post.totalImages,
                    labeledImages: labeled,
                    verifiedImages: verified,
                    amountLocked: Number(post.amountLocked),
                    amountDistributed: Number(post.amountDistributed),
                    labels: post.labels,
                    status: post.status,
                    createdAt: post.createdAt,
                    completedAt: post.completedAt,
                    verificationDeadline: post.verificationDeadline,
                    progress:
                        post.totalImages > 0
                            ? ((verified / post.totalImages) * 100).toFixed(1)
                            : "0.0",
                };
            })
        );

        return res.json({ posts: postsWithProgress });
    } catch (error) {
        console.error("Get posts error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// GET /api/company/posts/:postId
// ============================================
export async function getPostById(req: AuthRequest, res: Response) {
    try {
        const companyId = req.companyId!;
        const { postId } = req.params;

        const post = await prisma.post.findFirst({
            where: { id: postId, companyId },
        });

        if (!post) return res.status(404).json({ error: "Post not found" });

        const statusCounts = await prisma.data.groupBy({
            by: ["status"],
            where: { postId },
            _count: { _all: true },
        });

        const counts: Record<string, number> = {};
        statusCounts.forEach((s) => {
            counts[s.status] = s._count._all;
        });

        return res.json({
            post: {
                id: post.id,
                datasetName: post.datasetName,
                totalImages: post.totalImages,
                amountLocked: Number(post.amountLocked),
                labelingPool: Number(post.labelingPool),
                verificationPool: Number(post.verificationPool),
                amountDistributed: Number(post.amountDistributed),
                labels: post.labels,
                instructions: post.instructions,
                verificationRequired: post.verificationRequired,
                status: post.status,
                createdAt: post.createdAt,
                completedAt: post.completedAt,
                verificationDeadline: post.verificationDeadline,
                imageCounts: {
                    unlabeled: counts["UNLABELED"] || 0,
                    pendingVerification: counts["PENDING_VERIFICATION"] || 0,
                    verified: counts["VERIFIED"] || 0,
                },
            },
        });
    } catch (error) {
        console.error("Get post by ID error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// GET /api/company/posts/:postId/images
// ============================================
export async function getPostImages(req: AuthRequest, res: Response) {
    try {
        const companyId = req.companyId!;
        const { postId } = req.params;
        const page = parseInt((req.query.page as string) || "1", 10);
        const limit = parseInt((req.query.limit as string) || "20", 10);
        const statusFilter = req.query.status as DataStatus | undefined;

        // Verify ownership
        const post = await prisma.post.findFirst({
            where: { id: postId, companyId },
        });

        if (!post) return res.status(404).json({ error: "Post not found" });

        const skip = (page - 1) * limit;

        const whereClause: { postId: string; status?: DataStatus } = { postId };
        if (statusFilter) {
            whereClause.status = statusFilter;
        }

        const [images, total] = await Promise.all([
            prisma.data.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: "asc" },
                include: {
                    labeler: {
                        select: { id: true, walletAddress: true, name: true },
                    },
                    _count: { select: { verifications: true } },
                },
            }),
            prisma.data.count({ where: whereClause }),
        ]);

        return res.json({
            images: images.map((img) => ({
                id: img.id,
                imageUrl: img.imageUrl,
                status: img.status,
                assignedLabel: img.assignedLabel,
                tokenValue: Number(img.tokenValue),
                labeler: img.labeler,
                verificationCount: img._count.verifications,
                labeledAt: img.labeledAt,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get post images error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// GET /api/company/profile
// ============================================
export async function getProfile(req: AuthRequest, res: Response) {
    try {
        const companyId = req.companyId!;

        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!company) return res.status(404).json({ error: "Company not found" });

        return res.json({
            id: company.id,
            name: company.name,
            email: company.email,
            walletAddress: company.walletAddress,
            createdAt: company.createdAt,
        });
    } catch (error) {
        console.error("Get company profile error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// PUT /api/company/profile
// ============================================
export async function updateProfile(req: AuthRequest, res: Response) {
    try {
        const companyId = req.companyId!;
        const { name, walletAddress } = req.body;

        const updateData: { name?: string; walletAddress?: string } = {};
        if (name) updateData.name = name as string;
        if (walletAddress)
            updateData.walletAddress = (walletAddress as string).toLowerCase();

        const company = await prisma.company.update({
            where: { id: companyId },
            data: updateData,
        });

        return res.json({
            id: company.id,
            name: company.name,
            email: company.email,
            walletAddress: company.walletAddress,
        });
    } catch (error) {
        console.error("Update company profile error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
