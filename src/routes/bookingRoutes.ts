import express from "express";
import {
  findTeacherBorrowedBooks,
  myBorrowedBooks,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/booking/me/:username", myBorrowedBooks);
router.get("/booking/teacher/me/:username", findTeacherBorrowedBooks)

export default router;
