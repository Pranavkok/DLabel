import { Router } from "express";
import { authenticateAny } from "../middleware/auth.js";
import {
    getTransaction,
    confirmTransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

// Both users and companies can access transactions
router.use(authenticateAny);

router.get("/:id", getTransaction);
router.post("/confirm", confirmTransaction);

export default router;
