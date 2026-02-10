import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import { getNextImage, submitLabel } from "../controllers/label.controller.js";

const router = Router();

// All routes require user authentication
router.use(authenticateUser);

router.get("/next", getNextImage);
router.post("/submit", submitLabel);

export default router;
