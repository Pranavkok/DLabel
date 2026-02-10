import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
    getDashboard,
    getProfile,
    updateProfile,
    getEarnings,
    getTransactions,
    claimEarnings,
} from "../controllers/user.controller.js";

const router = Router();

// All routes require user authentication
router.use(authenticateUser);

router.get("/dashboard", getDashboard);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/earnings", getEarnings);
router.get("/transactions", getTransactions);
router.post("/claim", claimEarnings);

export default router;
