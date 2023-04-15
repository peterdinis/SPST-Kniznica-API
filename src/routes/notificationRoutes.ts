import express from "express";
import { createNotification, getAllNotifications, notificationInfo } from "../controllers/notificationController";

const router = express.Router();

router.get("/notifications", getAllNotifications);
router.get("/notification/:id", notificationInfo);
router.post("/notification", createNotification);

export default router;