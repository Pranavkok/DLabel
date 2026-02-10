import type { Response } from "express";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.js";

// ============================================
// GET /api/transactions/:id
// ============================================
export async function getTransaction(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params;

        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, walletAddress: true, name: true } },
                company: { select: { id: true, name: true, email: true } },
                post: { select: { id: true, datasetName: true } },
            },
        });

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        // Verify the requester has access to this transaction
        if (req.role === "user" && transaction.userId !== req.userId) {
            return res.status(403).json({ error: "Access denied" });
        }
        if (req.role === "company" && transaction.companyId !== req.companyId) {
            return res.status(403).json({ error: "Access denied" });
        }

        return res.json({
            id: transaction.id,
            type: transaction.type,
            amount: Number(transaction.amount),
            status: transaction.status,
            transactionHash: transaction.transactionHash,
            metadata: transaction.metadata,
            user: transaction.user,
            company: transaction.company,
            post: transaction.post,
            createdAt: transaction.createdAt,
            confirmedAt: transaction.confirmedAt,
        });
    } catch (error) {
        console.error("Get transaction error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/transactions/confirm
// Called after blockchain transaction is confirmed
// ============================================
export async function confirmTransaction(req: AuthRequest, res: Response) {
    try {
        const { transactionId, transactionHash } = req.body;

        if (!transactionId || !transactionHash) {
            return res
                .status(400)
                .json({ error: "transactionId and transactionHash are required" });
        }

        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId as string },
        });

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        if (transaction.status !== "PENDING") {
            return res.status(400).json({ error: "Transaction is not pending" });
        }

        // Verify the requester owns this transaction
        if (req.role === "user" && transaction.userId !== req.userId) {
            return res.status(403).json({ error: "Access denied" });
        }
        if (req.role === "company" && transaction.companyId !== req.companyId) {
            return res.status(403).json({ error: "Access denied" });
        }

        // Update transaction status
        const updated = await prisma.transaction.update({
            where: { id: transactionId as string },
            data: {
                status: "COMPLETED",
                transactionHash: transactionHash as string,
                confirmedAt: new Date(),
            },
        });

        // If this is a WITHDRAWAL, update user's tokensClaimed
        if (transaction.type === "WITHDRAWAL" && transaction.userId) {
            await prisma.user.update({
                where: { id: transaction.userId },
                data: {
                    tokensClaimed: { increment: Number(transaction.amount) },
                },
            });
        }

        return res.json({
            id: updated.id,
            status: updated.status,
            transactionHash: updated.transactionHash,
            confirmedAt: updated.confirmedAt,
        });
    } catch (error) {
        console.error("Confirm transaction error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
