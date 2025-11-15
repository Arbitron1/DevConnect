import { Request, Response } from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";
import mongoose from "mongoose";

function getUserId(req: Request) {
  return (req as any).userId as string | undefined;
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { content, images } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Post.create({
      author: new mongoose.Types.ObjectId(userId),
      content: content.trim(),
      images: Array.isArray(images) ? images : [],
    });

    const populated = await post.populate("author", "name avatar bio");

    res.status(201).json({ post: populated });
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = Math.min(parseInt((req.query.limit as string) || "10", 10), 50);

    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name avatar bio")
      .lean();

    const validPosts = posts.filter((p) => p.author);

    res.json({
      posts: validPosts,
      page,
      limit,
      count: validPosts.length,
    });
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid post ID" });

    const post = await Post.findById(id).populate("author", "name avatar bio");
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comments = await Comment.find({ post: id })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("author", "name avatar");

    res.json({ post, comments });
  } catch (err) {
    console.error("Get post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid post ID" });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userObj = new mongoose.Types.ObjectId(userId);

    const alreadyLiked = post.likes.some((l) => l.equals(userObj));

    if (alreadyLiked) {
      post.likes = post.likes.filter((l) => !l.equals(userObj));
    } else {
      post.likes.push(userObj);
    }

    await post.save();

    res.json({
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    });
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid post ID" });

    if (!text || !text.trim())
      return res.status(400).json({ message: "Comment text required" });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      post: post._id,
      author: new mongoose.Types.ObjectId(userId),
      text: text.trim(),
    });

    post.commentsCount += 1;
    await post.save();

    const populated = await comment.populate("author", "name avatar");

    res.status(201).json({
      comment: populated,
      commentsCount: post.commentsCount,
    });
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
