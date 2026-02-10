import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

export const uploadZip = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        if (
            file.mimetype === "application/zip" ||
            file.mimetype === "application/x-zip-compressed" ||
            file.originalname.endsWith(".zip")
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only ZIP files are allowed"));
        }
    },
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB max
    },
});
