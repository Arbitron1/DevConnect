import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  addComment,
  deletePost,
} from "../controllers/postController";

import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createPost);

router.get("/", getPosts);

router.get("/:id", getPostById);

router.post("/:id/like", authMiddleware, toggleLike);

router.post("/:id/comments", authMiddleware, addComment);

router.delete("/:id", authMiddleware, deletePost);

export default router;
