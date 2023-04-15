import express from "express";
import { getAllNotifications, notificationInfo } from "../controllers/notificationController";

const router = express.Router();

router.get("/notifications", getAllNotifications);
router.get("/notification/:id", notificationInfo);

export default router;