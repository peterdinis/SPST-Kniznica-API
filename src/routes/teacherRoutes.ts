import express from "express";
import { verifyToken } from "../middleware/auth";
import {
  findAllPaginatedTeacher,
  getAllTeachers,
  getTeacherInfo,
  newPassword,
  teacherLogin,
  teacherProfile,
  teacherRegister,
} from "../controllers/teacherController";

const router = express.Router();

router.get("/teachers", getAllTeachers);
router.get("/teachers/:paginate", findAllPaginatedTeacher)
router.get("/teacher/info/:id", getTeacherInfo);
router.post("/teacher/register", teacherRegister);
router.post("/teacher/login", teacherLogin);
router.get("/teacher/profile", verifyToken, teacherProfile);
router.patch("/teacher/password/:username/new", newPassword);

export default router;
