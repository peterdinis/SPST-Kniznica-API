import express from "express";
import { verifyToken } from "../middleware/auth";
import {
  getAllTeachers,
  getMyNotifications,
  getTeacherInfo,
  readNotification,
  removeAllNotifications,
  removeNotification,
  teacherLogin,
  teacherProfile,
  teacherRegister,
} from "../controllers/teacherController";

const router = express.Router();

router.get("/teachers", getAllTeachers);
router.get("/teacher/info/:id", getTeacherInfo);
router.post("/teacher/register", teacherRegister);
router.post("/teacher/login", teacherLogin);
router.get("/teacher/profile", verifyToken, teacherProfile);
router.get("/teacher/:username/notifications", getMyNotifications);
router.patch(
  "/teacher/:username/notification/:notificationId/read",
  readNotification
);
router.delete(
  "/teacher/:username/notification/:notificationId/remove",
  removeNotification
);
router.delete(
  "/teacher/:username/notifications/remove/all",
  removeAllNotifications
);
export default router;
