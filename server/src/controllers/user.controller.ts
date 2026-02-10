import type { Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.js";
import { getReputationTier, getMultiplier } from "../utils/reputation.js";
import { calculateTotalEarnings, getPendingMap } from "../utils/rewards.js";

// ============================================
// GET /api/user/dashboard
// ============================================
export async function getDashboard(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        // Active posts available for labeling
        const availablePosts = await prisma.post.count({
            where: { status: "ACTIVE" },
        });

        // Images pending verification (labeled by user, awaiting verification)
        const pendingVerification = await prisma.data.count({
            where: {
                labeledBy: userId,
                status: "PENDING_VERIFICATION",
            },
        });

        // Total earnings calculation
        const totalEarnings = await calculateTotalEarnings(userId);

        return res.json({
            user: {
                id: user.id,
                walletAddress: user.walletAddress,
                name: user.name,
                reputation: user.reputation,
                tier: getReputationTier(user.reputation),
                multiplier: getMultiplier(user.reputation),
            },
            stats: {
                labelsSubmitted: user.labelsSubmitted,
                labelsVerifiedCorrect: user.labelsVerifiedCorrect,
                labelsVerifiedIncorrect: user.labelsVerifiedIncorrect,
                verificationsDone: user.verificationsDone,
                accuracy:
                    user.labelsSubmitted > 0
                        ? (
                            (user.labelsVerifiedCorrect / user.labelsSubmitted) *
                            100
                        ).toFixed(1)
                        : "0.0",
            },
            earnings: {
                totalEarned: totalEarnings,
                tokensClaimed: Number(user.tokensClaimed),
                pendingClaim: totalEarnings - Number(user.tokensClaimed),
            },
            overview: {
                availablePosts,
                imagesLabeled: user.labelsSubmitted,
                pendingVerification,
            },
        });
    } catch (error) {
        console.error("Get dashboard error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// GET /api/user/profile
// ============================================
export async function getProfile(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        return res.json({
            id: user.id,
            walletAddress: user.walletAddress,
            name: user.name,
            reputation: user.reputation,
            tier: getReputationTier(user.reputation),
            multiplier: getMultiplier(user.reputation),
            labelsSubmitted: user.labelsSubmitted,
            labelsVerifiedCorrect: user.labelsVerifiedCorrect,
            labelsVerifiedIncorrect: user.labelsVerifiedIncorrect,
            verificationsDone: user.verificationsDone,
            tokensEarned: Number(user.tokensEarned),
            tokensClaimed: Number(user.tokensClaimed),
            createdAt: user.createdAt,
            lastActive: user.lastActive,
        });
    } catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// PUT /api/user/profile
// ============================================
export async function updateProfile(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;
        const { name } = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: { name: name as string },
        });

        return res.json({
            id: user.id,
            walletAddress: user.walletAddress,
            name: user.name,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// GET /api/user/earnings
// ============================================
export async function getEarnings(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        const totalEarnings = await calculateTotalEarnings(userId);

        // Earnings per post
        const postsWithLabels = await prisma.post.findMany({
            where: {
                data: { some: { labeledBy: userId } },
            },
            select: {
                id: true,
                datasetName: true,
                amountLocked: true,
                _count: {
                    select: {
                        data: {
                            where: { labeledBy: userId, status: "VERIFIED" },
                        },
                    },
                },
            },
        });

        return res.json({
            totalEarned: totalEarnings,
            tokensClaimed: Number(user.tokensClaimed),
            pendingClaim: totalEarnings - Number(user.tokensClaimed),
            tier: getReputationTier(user.reputation),
            multiplier: getMultiplier(user.reputation),
            byPost: postsWithLabels.map((p) => ({
                postId: p.id,
                datasetName: p.datasetName,
                verifiedLabels: p._count.data,
            })),
        });
    } catch (error) {
        console.error("Get earnings error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// GET /api/user/transactions
// ============================================
export async function getTransactions(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;

        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                post: {
                    select: { datasetName: true },
                },
            },
        });

        return res.json({
            transactions: transactions.map((t) => ({
                id: t.id,
                type: t.type,
                amount: Number(t.amount),
                status: t.status,
                transactionHash: t.transactionHash,
                datasetName: t.post?.datasetName ?? null,
                createdAt: t.createdAt,
                confirmedAt: t.confirmedAt,
            })),
        });
    } catch (error) {
        console.error("Get transactions error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/user/claim
// ============================================
// ============================================
// POST /api/user/claim
// ============================================
export async function claimEarnings(req: AuthRequest, res: Response) {
    try {
        const userId = req.userId!;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        const pendingClaims = await getPendingMap(userId);

        if (pendingClaims.length === 0) {
            return res.status(400).json({ error: "No earnings to claim" });
        }

        // Generate signature for smart contract
        const { generateClaimSignature } = await import("../utils/signature.js");
        const { ethers } = await import("ethers");

        const claims = [];

        for (const claim of pendingClaims) {
            const nonce = Date.now() + Math.floor(Math.random() * 1000); // Unique nonce
            const amountInWei = ethers.parseEther(claim.amount.toFixed(18));

            // For contract, we use postId as the datasetId to ensure uniqueness
            // Ideally, companies should create datasets using postId as the ID on-chain.
            const contractDatasetId = claim.postId;

            const signature = await generateClaimSignature(
                user.walletAddress,
                contractDatasetId,
                amountInWei,
                nonce
            );

            // Create pending transaction
            const transaction = await prisma.transaction.create({
                data: {
                    userId: user.id,
                    postId: claim.postId,
                    type: "WITHDRAWAL",
                    amount: claim.amount,
                    status: "PENDING",
                    metadata: { nonce, amountInWei: amountInWei.toString(), datasetId: contractDatasetId },
                },
            });

            claims.push({
                transactionId: transaction.id,
                datasetId: contractDatasetId,
                amount: claim.amount,
                amountInWei: amountInWei.toString(),
                nonce,
                signature,
            });
        }

        return res.json({
            claims,
            walletAddress: user.walletAddress,
        });
    } catch (error) {
        console.error("Claim earnings error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
