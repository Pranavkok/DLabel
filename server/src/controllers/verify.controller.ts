import type { Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.js";
import { calculateReputationChange } from "../utils/reputation.js";

const REQUIRED_VOTES = 3; // Number of votes needed before deciding
const MAJORITY_THRESHOLD = 2; // 2 out of 3

// ============================================
// GET /api/verify/next
// ============================================
export async function getNextVerification(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;

        // Find an image that:
        // 1. Is PENDING_VERIFICATION
        // 2. Was NOT labeled by this user (can't verify own work)
        // 3. This user has NOT already verified
        // 4. Has fewer than REQUIRED_VOTES verifications
        // 5. Belongs to an ACTIVE post
        const image = await prisma.data.findFirst({
            where: {
                status: "PENDING_VERIFICATION",
                labeledBy: { not: userId },
                post: { status: "ACTIVE" },
                verifications: {
                    none: { verifierId: userId },
                },
            },
            include: {
                post: {
                    select: {
                        id: true,
                        datasetName: true,
                        labels: true,
                        instructions: true,
                    },
                },
                _count: {
                    select: { verifications: true },
                },
            },
            orderBy: {
                labeledAt: "asc",
            },
        });

        if (!image || image._count.verifications >= REQUIRED_VOTES) {
            return res.json({
                message: "No images available for verification right now",
                image: null,
            });
        }

        return res.json({
            image: {
                id: image.id,
                imageUrl: image.imageUrl,
                assignedLabel: image.assignedLabel,
                currentVotes: image._count.verifications,
                requiredVotes: REQUIRED_VOTES,
            },
            post: {
                id: image.post.id,
                datasetName: image.post.datasetName,
                labels: image.post.labels,
                instructions: image.post.instructions,
            },
        });
    } catch (error) {
        console.error("Get next verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/verify/submit
// ============================================
export async function submitVerification(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;
        const { imageId, vote } = req.body;

        if (!imageId || !vote) {
            return res.status(400).json({ error: "imageId and vote are required" });
        }

        if (vote !== "YES" && vote !== "NO") {
            return res.status(400).json({ error: "vote must be YES or NO" });
        }

        // Find the image
        const image = await prisma.data.findUnique({
            where: { id: imageId as string },
            include: {
                verifications: true,
                post: { select: { status: true } },
            },
        });

        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }

        if (image.status !== "PENDING_VERIFICATION") {
            return res.status(400).json({ error: "Image is not pending verification" });
        }

        if (image.labeledBy === userId) {
            return res.status(400).json({ error: "Cannot verify your own label" });
        }

        if (image.post.status !== "ACTIVE") {
            return res.status(400).json({ error: "This dataset is no longer active" });
        }

        // Check if user already verified this image
        const existingVote = image.verifications.find((v: { verifierId: string }) => v.verifierId === userId);
        if (existingVote) {
            return res.status(400).json({ error: "You have already verified this image" });
        }

        // Create verification
        await prisma.verification.create({
            data: {
                dataId: imageId as string,
                verifierId: userId,
                vote: vote as "YES" | "NO",
            },
        });

        // Update verifier stats only (verifier reputation should not change)
        await prisma.user.update({
            where: { id: userId },
            data: {
                verificationsDone: { increment: 1 },
            },
        });

        // Apply immediate reputation impact to labeler based on this vote
        if (image.labeledBy) {
            const labeler = await prisma.user.findUnique({
                where: { id: image.labeledBy },
                select: { id: true, reputation: true },
            });

            if (labeler) {
                await prisma.user.update({
                    where: { id: image.labeledBy },
                    data: {
                        reputation: calculateReputationChange(
                            vote === "YES" ? "LABEL_VERIFIED" : "LABEL_REJECTED",
                            labeler.reputation
                        ),
                    },
                });
            }
        }

        // Check if we have enough votes to decide
        const allVerifications = await prisma.verification.findMany({
            where: { dataId: imageId as string },
        });

        let resultMessage = "Vote recorded. Waiting for more verifications.";

        if (allVerifications.length >= REQUIRED_VOTES) {
            const yesVotes = allVerifications.filter((v: { vote: "YES" | "NO" }) => v.vote === "YES").length;
            const noVotes = allVerifications.filter((v: { vote: "YES" | "NO" }) => v.vote === "NO").length;

            if (yesVotes >= MAJORITY_THRESHOLD) {
                // Label VERIFIED - majority agrees
                await prisma.data.update({
                    where: { id: imageId as string },
                    data: { status: "VERIFIED" },
                });

                // Reward the labeler with stats/token updates.
                // Reputation is already updated per vote above.
                if (image.labeledBy) {
                    const labeler = await prisma.user.findUnique({
                        where: { id: image.labeledBy },
                    });
                    if (labeler) {
                        await prisma.user.update({
                            where: { id: image.labeledBy },
                            data: {
                                labelsVerifiedCorrect: { increment: 1 },
                                tokensEarned: { increment: Number(image.tokenValue) },
                            },
                        });
                    }
                }

                resultMessage = "Label verified! ✅ Majority voted YES.";
            } else if (noVotes >= MAJORITY_THRESHOLD) {
                // Label REJECTED - reset image to UNLABELED
                await prisma.data.update({
                    where: { id: imageId as string },
                    data: {
                        status: "UNLABELED",
                        assignedLabel: null,
                        labeledBy: null,
                        labeledAt: null,
                    },
                });

                // Record incorrect label stats.
                // Reputation is already updated per vote above.
                if (image.labeledBy) {
                    const labeler = await prisma.user.findUnique({
                        where: { id: image.labeledBy },
                    });
                    if (labeler) {
                        await prisma.user.update({
                            where: { id: image.labeledBy },
                            data: {
                                labelsVerifiedIncorrect: { increment: 1 },
                            },
                        });
                    }
                }

                // Delete old verifications so new labeler can start fresh
                await prisma.verification.deleteMany({
                    where: { dataId: imageId as string },
                });

                resultMessage = "Label rejected! ❌ Image reset for re-labeling.";
            }

            // Check if all images in the post are verified → mark post as COMPLETED
            const postData = await prisma.data.findUnique({
                where: { id: imageId as string },
                select: { postId: true },
            });

            if (postData) {
                const post = await prisma.post.findUnique({
                    where: { id: postData.postId },
                });

                if (post) {
                    const verifiedCount = await prisma.data.count({
                        where: { postId: post.id, status: "VERIFIED" },
                    });

                    if (verifiedCount >= post.totalImages) {
                        await prisma.post.update({
                            where: { id: post.id },
                            data: {
                                status: "COMPLETED",
                                completedAt: new Date(),
                            },
                        });
                    }
                }
            }
        }

        return res.json({
            success: true,
            message: resultMessage,
            votesRecorded: allVerifications.length,
            requiredVotes: REQUIRED_VOTES,
        });
    } catch (error) {
        console.error("Submit verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
