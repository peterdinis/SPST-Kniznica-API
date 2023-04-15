import express from "express";
import {
  deleteProfile,
  getAllStudents,
  getMyNotifications,
  getStudentInfo,
  readNotification,
  removeAllNotifications,
  removeNotification,
  studentLogin,
  studentProfile,
  studentRegister,
  updateProfile,
} from "../controllers/studentController";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/student/info/:id", getStudentInfo);
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);
router.get("/student/profile", verifyToken, studentProfile);
router.patch("/student/profile/update/:id", updateProfile);
router.delete("/student/delete/:id", deleteProfile);
router.get("/student/:username/notifications", getMyNotifications);
router.patch(
  "/student/:username/notification/:notificationId/read",
  readNotification
);
router.delete(
  "/student/:username/notification/:notificationId/remove",
  removeNotification
);
router.delete(
  "/student/:username/notifications/remove/all",
  removeAllNotifications
);

export default router;
