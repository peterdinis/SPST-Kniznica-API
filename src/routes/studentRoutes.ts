import express from "express";
import { saveStudent, removeStudent, displayAllStudent } from "../controllers/studentController";
import { getMyBorrowedBooks } from "../controllers/bookingController";

const router = express.Router();

router.get("/students", displayAllStudent);
router.get("/foro", getMyBorrowedBooks);
router.post("/student", saveStudent);
router.delete("/student/delete", removeStudent);

export default router