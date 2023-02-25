import express from "express";
import { getMyBorrowedBooks, getMyTeacherBorrowedBooks } from "../controllers/bookingController";

const router = express.Router();

router.get("/student/borrowed/:email", getMyBorrowedBooks);
router.get("/teacher/borrowed/:email", getMyTeacherBorrowedBooks);

export default router;