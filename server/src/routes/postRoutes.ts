import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import Post from "../models/Post";

const router = express.Router();

router.post("/", verifyToken, async (req: any, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const post = new Post({ user: req.user.id, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", verifyToken, async (_req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
