import express from "express";
import { saveTeacher, removeTeacher, displayAllTeacher } from "../controllers/teacherController";
import { getMyTeacherBorrowedBooks } from "../controllers/bookingController";

const router = express.Router();

router.get("/teachers", displayAllTeacher);
router.get("/foro/teacher", getMyTeacherBorrowedBooks);
router.post("/teacher", saveTeacher);
router.delete("/teacher/delete", removeTeacher);

export default router;