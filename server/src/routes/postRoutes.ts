import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import Post from "../models/Post";

const router = express.Router();


router.post("/", verifyToken, async (req: any, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const post = new Post({
      user: req.user.id,
      content,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", verifyToken, async (req: any, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(
      posts.map((p) => ({
        ...p.toObject(),
        likesCount: p.likes?.length || 0,
        likedByUser: p.likes?.includes(req.user.id) || false,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/:id/like", verifyToken, async (req: any, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    let updatedPost;
    if (alreadyLiked) {
  
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    }

    return res.json({
      liked: !alreadyLiked,
      likesCount: updatedPost.likes.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
