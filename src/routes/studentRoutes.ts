import express from "express";
import {
  deactivatedProfile,
  findAllPaginatedStudents,
  getAllStudents,
  getStudentInfo,
  studentLogin,
  studentProfile,
  studentRegister,
} from "../controllers/studentController";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/student/info/:id", getStudentInfo);
router.get("/student/:paginate", findAllPaginatedStudents);
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);
router.get("/student/profile", verifyToken, studentProfile);
router.delete("/student/profile/delete/:username", deactivatedProfile);

export default router;
