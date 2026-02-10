import type { Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.js";
import {
    generateUserToken,
    generateCompanyToken,
} from "../middleware/auth.js";

// ============================================
// POST /api/auth/connect  (User - Wallet)
// ============================================
export async function connectWallet(req: AuthRequest, res: Response) {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({ error: "walletAddress is required" });
        }

        const normalizedAddress = (walletAddress as string).toLowerCase();

        // Upsert user: create if new, update lastActive if existing
        const user = await prisma.user.upsert({
            where: { walletAddress: normalizedAddress },
            update: { lastActive: new Date() },
            create: { walletAddress: normalizedAddress },
        });

        const token = generateUserToken(user.id);

        return res.json({
            token,
            user: {
                id: user.id,
                walletAddress: user.walletAddress,
                name: user.name,
                reputation: user.reputation,
            },
        });
    } catch (error) {
        console.error("Connect wallet error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/auth/company/login  (Company - Email/Password)
// ============================================
export async function companyLogin(req: AuthRequest, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const company = await prisma.company.findFirst({
            where: { email: (email as string).toLowerCase() },
        });

        if (!company) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isValidPassword = await bcrypt.compare(password as string, company.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = generateCompanyToken(company.id);

        return res.json({
            token,
            company: {
                id: company.id,
                name: company.name,
                email: company.email,
                walletAddress: company.walletAddress,
            },
        });
    } catch (error) {
        console.error("Company login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/auth/company/register  (Admin creates company)
// ============================================
export async function companyRegister(req: AuthRequest, res: Response) {
    try {
        const { email, password, name, walletAddress } = req.body;

        if (!email || !password || !name || !walletAddress) {
            return res
                .status(400)
                .json({ error: "email, password, name, and walletAddress are required" });
        }

        // Check if company already exists
        const existing = await prisma.company.findFirst({
            where: {
                OR: [
                    { email: (email as string).toLowerCase() },
                    { walletAddress: (walletAddress as string).toLowerCase() },
                ],
            },
        });

        if (existing) {
            return res.status(409).json({ error: "Company with this email or wallet already exists" });
        }

        const hashedPassword = await bcrypt.hash(password as string, 12);

        const company = await prisma.company.create({
            data: {
                email: (email as string).toLowerCase(),
                password: hashedPassword,
                name: name as string,
                walletAddress: (walletAddress as string).toLowerCase(),
            },
        });

        const token = generateCompanyToken(company.id);

        return res.status(201).json({
            token,
            company: {
                id: company.id,
                name: company.name,
                email: company.email,
                walletAddress: company.walletAddress,
            },
        });
    } catch (error) {
        console.error("Company register error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// ============================================
// POST /api/auth/logout  (Stateless - just acknowledge)
// ============================================
export async function logout(_req: AuthRequest, res: Response) {
    // JWT is stateless, client just discards the token
    return res.json({ message: "Logged out successfully" });
}
