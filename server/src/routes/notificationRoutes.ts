import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getNotifications } from "../controllers/notificationController";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);

export default router;
