import { Router } from "express";
import { authenticateCompany } from "../middleware/auth.js";
import { uploadZip } from "../middleware/upload.js";
import {
    getDashboard,
    createPost,
    uploadImages,
    getPosts,
    getPostById,
    getPostImages,
    getProfile,
    updateProfile,
} from "../controllers/company.controller.js";

const router = Router();

// All routes require company authentication
router.use(authenticateCompany);

// Dashboard
router.get("/dashboard", getDashboard);

// Posts (Datasets)
router.post("/post/create", createPost);
router.post("/post/images", uploadZip.single("zipFile"), uploadImages);
router.get("/posts", getPosts);
router.get("/posts/:postId", getPostById);
router.get("/posts/:postId/images", getPostImages);

// Profile
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;
