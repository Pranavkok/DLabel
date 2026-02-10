import "dotenv/config";
import express from "express";
import cors from "cors";

// Route imports
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import labelRoutes from "./routes/label.routes.js";
import verifyRoutes from "./routes/verify.routes.js";
import companyRoutes from "./routes/company.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (_req, res) => {
    res.json({
        name: "DataLabel API",
        version: "1.0.0",
        status: "running",
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/label", labelRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/transactions", transactionRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 DataLabel API running on http://localhost:${PORT}`);
});