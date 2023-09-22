import express from "express";
import {
  adminProfile,
  deactivatedStudentProfile,
  deactivatedTeacherProfile,
  loginAdmin,
  registerAdmin,
} from "../controllers/adminController";

const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile", adminProfile);
router.delete("/student/profile/delete/:studentId", deactivatedStudentProfile);
router.delete("/teacher/profile/delete/:teacherId", deactivatedTeacherProfile);

export default router;
