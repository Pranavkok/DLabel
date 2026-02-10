import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "datalabel-secret-key-change-in-production";

// Extend Express Request
export interface AuthRequest extends Request {
    userId?: string;
    companyId?: string;
    role?: "user" | "company";
}

// Generate JWT for User (labeler)
export function generateUserToken(userId: string): string {
    return jwt.sign({ userId, role: "user" }, JWT_SECRET, { expiresIn: "7d" });
}

// Generate JWT for Company
export function generateCompanyToken(companyId: string): string {
    return jwt.sign({ companyId, role: "company" }, JWT_SECRET, { expiresIn: "7d" });
}

// Middleware: Authenticate User (labeler)
export function authenticateUser(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
        if (decoded.role !== "user") {
            res.status(403).json({ error: "Access denied. User token required." });
            return;
        }
        (req as AuthRequest).userId = decoded.userId;
        (req as AuthRequest).role = "user";
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

// Middleware: Authenticate Company
export function authenticateCompany(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { companyId: string; role: string };
        if (decoded.role !== "company") {
            res.status(403).json({ error: "Access denied. Company token required." });
            return;
        }
        (req as AuthRequest).companyId = decoded.companyId;
        (req as AuthRequest).role = "company";
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

// Middleware: Authenticate either User or Company
export function authenticateAny(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId?: string;
            companyId?: string;
            role: string;
        };
        if (decoded.role === "user") {
            (req as AuthRequest).userId = decoded.userId;
            (req as AuthRequest).role = "user";
        } else if (decoded.role === "company") {
            (req as AuthRequest).companyId = decoded.companyId;
            (req as AuthRequest).role = "company";
        }
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}
