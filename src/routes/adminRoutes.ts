import express from "express";
import {
  adminProfile,
  deactivatedProfile,
  deactivatedTeacherProfile,
  loginAdmin,
  registerAdmin,
  restartStudentProfile,
  restartTeacherProfile,
} from "../controllers/adminController";

const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile", adminProfile);
router.patch("/admin/reactivate/teacher/:username", restartTeacherProfile);
router.patch("/admin/reactivate/student/:username", restartStudentProfile);
router.delete("/student/profile/delete/:username", deactivatedProfile);
router.delete("/teacher/profile/delete/:username", deactivatedTeacherProfile);
export default router;
