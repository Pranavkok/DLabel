import { Router } from "express";
import {
    connectWallet,
    companyLogin,
    companyRegister,
    logout,
} from "../controllers/auth.controller.js";

const router = Router();

// User (Labeler) - Wallet Auth
router.post("/connect", connectWallet);

// Company - Email/Password Auth
router.post("/company/login", companyLogin);
router.post("/company/register", companyRegister);

// Logout (stateless)
router.post("/logout", logout);

export default router;
