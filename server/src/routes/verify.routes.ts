import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import {
    getNextVerification,
    submitVerification,
} from "../controllers/verify.controller.js";

const router = Router();

// All routes require user authentication
router.use(authenticateUser);

router.get("/next", getNextVerification);
router.post("/submit", submitVerification);

export default router;
