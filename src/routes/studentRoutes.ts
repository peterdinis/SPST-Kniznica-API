import express from "express";
import {
  findAllPaginatedStudents,
  getAllStudents,
  getStudentInfo,
  studentLogin,
  studentProfile,
  studentRegister,
  uploadPicture,
} from "../controllers/studentController";
import { verifyToken } from "../middleware/auth";
import { upload } from "../multer";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/student/info/:id", getStudentInfo);
router.get("/student/:paginate", findAllPaginatedStudents);
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);
router.get("/student/profile", verifyToken, studentProfile);
router.post("/student/:id/upload", upload.single("avatar"), uploadPicture);

export default router;
