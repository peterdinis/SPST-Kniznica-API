import express from "express";
import {
  deleteProfile,
  findAllPaginatedStudents,
  getAllStudents,
  getStudentInfo,
  studentLogin,
  studentProfile,
  studentRegister,
  updateProfile,
} from "../controllers/studentController";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/student/info/:id", getStudentInfo);
router.get("/student/:paginate", findAllPaginatedStudents);
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);
router.get("/student/profile", verifyToken, studentProfile);
router.patch("/student/profile/update/:username", updateProfile);
router.delete("/student/profile/delete/:username", deleteProfile);


export default router;
