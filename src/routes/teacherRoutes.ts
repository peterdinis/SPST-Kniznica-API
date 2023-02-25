import express from "express";
import { saveTeacher, removeTeacher, displayAllTeacher } from "../controllers/teacherController";

const router = express.Router();

router.get("/teachers", displayAllTeacher);
router.post("/teacher", saveTeacher);
router.delete("/teacher/delete/:email", removeTeacher);

export default router;