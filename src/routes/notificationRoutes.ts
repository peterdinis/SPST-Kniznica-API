import express from "express";
import { getAllNotifications } from "../controllers/notificationController";

const router = express.Router();


router.get("/notifications", getAllNotifications);

export default router;