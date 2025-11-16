import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import fs from "fs";

const router = express.Router();

console.log("Cloudinary READY:", cloudinary.config());

const upload = multer({ dest: "tmp/" });

router.post("/", upload.single("image"), async (req: any, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary manually
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "devconnect_posts",
    });

    // Remove temp file
    fs.unlink(req.file.path, () => {});

    res.json({ url: uploadResult.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
