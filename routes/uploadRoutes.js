// import express from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// const router = express.Router();

// // Create __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Configure Multer storage using the slug from req.body
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../../front/public/images"));
//   },
//   filename: (req, file, cb) => {
//     console.log("req.body at filename callback:", req.body); // Check for slug here
//     const slug = req.body.slug; // Expecting this to be defined
//     const ext =".png";
//     cb(null, `${slug}${ext}`);
//   },
// });


// const upload = multer({ storage });

// // Endpoint to handle file upload
// router.post("/upload", upload.single("icon"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   // Return only the slug as iconName, as required by your model
//   const slug = req.body.slug;
//   res.json({
//     message: "File uploaded successfully",
//     iconName: slug,
//   });
// });

// export default router;


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
    console.log("req.body at filename callback:", req.body);
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
