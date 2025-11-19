import { Request, Response } from "express";
import User from "../models/User";
import Post from "../models/Post";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: id })
      .sort({ createdAt: -1 })
      .populate("author", "name avatar bio")
      .lean();

    const followersCount = (user.followers || []).length;
    const followingCount = (user.following || []).length;

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        followersCount,
        followingCount,
      },
      posts,
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMyProfile = async (req: any, res: Response) => {
  try {
    const userId = req.userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const userDoc = await User.findById(userId).select("-password");
    if (!userDoc) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "name avatar bio")
      .lean();

    res.json({
      user: {
        _id: userDoc._id,
        name: userDoc.name,
        avatar: userDoc.avatar,
        bio: userDoc.bio,
        followersCount: (userDoc.followers || []).length,
        followingCount: (userDoc.following || []).length,
      },
      posts,
    });
  } catch (err) {
    console.error("MyProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
