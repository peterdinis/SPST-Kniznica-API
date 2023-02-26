import express from "express";
import { getAllStudents, getStudentInfo, studentLogin, studentProfile, studentRegister, updateProfile } from "../controllers/studentController";
import {verifyToken} from "../middleware/auth";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/student/info/:id", getStudentInfo);
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);
router.get("/student/profile", verifyToken, studentProfile);
router.patch("/student/profile/update/:id", updateProfile);

export default router