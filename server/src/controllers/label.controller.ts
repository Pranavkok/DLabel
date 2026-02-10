import type { Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.js";

// ============================================
// GET /api/label/next
// ============================================
export async function getNextImage(req: AuthRequest, res: Response) {
    try {
        const _userId = req.userId!;

        // Find an UNLABELED image from an ACTIVE post
        const image = await prisma.data.findFirst({
            where: {
                status: "UNLABELED",
                labeledBy: null,
                post: { status: "ACTIVE" },
            },
            include: {
                post: {
                    select: {
                        id: true,
                        datasetName: true,
                        labels: true,
                        instructions: true,
                        totalImages: true,
                    },
                },
            },
            orderBy: {
                createdAt: "asc", // Oldest first (FIFO)
            },
        });

        if (!image) {
            return res.json({
                message: "No images available for labeling right now",
                image: null,
            });
        }

        return res.json({
            image: {
                id: image.id,
                imageUrl: image.imageUrl,
                tokenValue: Number(image.tokenValue),
            },
            post: {
                id: image.post.id,
                datasetName: image.post.datasetName,
                labels: image.post.labels, // Available label options
                instructions: image.post.instructions,
            },
        });
    } catch (error) {
        console.error("Get next image error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/label/submit
// ============================================
export async function submitLabel(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;
        const { imageId, label } = req.body;

        if (!imageId || !label) {
            return res.status(400).json({ error: "imageId and label are required" });
        }

        // Find the image
        const image = await prisma.data.findUnique({
            where: { id: imageId as string },
            include: {
                post: {
                    select: { labels: true, status: true, verificationRequired: true },
                },
            },
        });

        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }

        if (image.status !== "UNLABELED") {
            return res.status(400).json({ error: "Image has already been labeled" });
        }

        if (image.post.status !== "ACTIVE") {
            return res.status(400).json({ error: "This dataset is no longer active" });
        }

        // Validate label is one of the allowed options
        const allowedLabels = image.post.labels as string[];
        if (!allowedLabels.includes(label as string)) {
            return res.status(400).json({
                error: `Invalid label. Allowed: ${allowedLabels.join(", ")}`,
            });
        }

        // Determine new status based on verification requirement
        const newStatus = image.post.verificationRequired
            ? "PENDING_VERIFICATION"
            : "VERIFIED";

        // Update the image with label
        const updatedImage = await prisma.data.update({
            where: { id: imageId as string },
            data: {
                assignedLabel: label as string,
                labeledBy: userId,
                labeledAt: new Date(),
                status: newStatus,
            },
        });

        // Update user stats
        await prisma.user.update({
            where: { id: userId },
            data: {
                labelsSubmitted: { increment: 1 },
                // If no verification required, count as verified correct immediately
                ...(newStatus === "VERIFIED"
                    ? { labelsVerifiedCorrect: { increment: 1 } }
                    : {}),
            },
        });

        return res.json({
            success: true,
            imageId: updatedImage.id,
            label: updatedImage.assignedLabel,
            status: updatedImage.status,
            message:
                newStatus === "VERIFIED"
                    ? "Label submitted and auto-verified!"
                    : "Label submitted. Awaiting verification.",
        });
    } catch (error) {
        console.error("Submit label error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
