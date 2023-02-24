import express from "express";
import { saveStudent, studentInfo, removeStudent } from "../controllers/studentController";

const router = express.Router();

router.post("/student", saveStudent);
router.get("/student/:email", studentInfo);
router.delete("/student/delete/:email", removeStudent);

export default router