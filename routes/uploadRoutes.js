import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Convert ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer with slug-based filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../front/public/images"));
  },
  filename: (req, file, cb) => {
    //console.log("req.body at filename callback:", req.body);
    const slug = req.body.slug;
    const ext = ".png";
    cb(null, `${slug}${ext}`); // File named after slug
  },
});

const upload = multer({ storage });

// API endpoint for uploads
router.post("/upload", upload.single("icon"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const slug = req.body.slug;
  res.json({
    message: "File uploaded successfully",
    iconName: slug, // Only return slug as icon name
  });
});

export default router;
