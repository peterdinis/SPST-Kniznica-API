import express from "express";
import { saveStudent, studentInfo, removeStudent, displayAllStudent } from "../controllers/studentController";

const router = express.Router();

router.get("/students", displayAllStudent);
router.post("/student", saveStudent);
router.get("/student/:email", studentInfo);
router.delete("/student/delete/:email", removeStudent);

export default router