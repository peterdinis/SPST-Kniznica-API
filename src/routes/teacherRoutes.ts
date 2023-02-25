import express from "express";
import { saveTeacher, teacherInfo, removeTeacher, displayAllTeacher } from "../controllers/teacherController";

const router = express.Router();

router.get("/teachers", displayAllTeacher);
router.post("/teacher", saveTeacher);
router.get("/teacher/:email", teacherInfo);
router.delete("/teacher/delete/:email", removeTeacher);

export default router