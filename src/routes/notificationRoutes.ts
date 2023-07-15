import express from "express";
import { displayAllNotifications, getMyNotification } from "../controllers/notificationController";

const router = express.Router();

router.get("/notifications", displayAllNotifications);
router.get("/notifications/:username", getMyNotification);

export default router;
