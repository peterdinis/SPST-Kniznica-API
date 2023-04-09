import express from "express";
import {
  bookingInfo,
  createBooking,
  findAllPaginatedBooking,
  getAllBooking,
  getStudentBooking,
  getTeacherBorrowedBooks,
  studentReturnBook,
  teacherReturnBook,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/bookings", getAllBooking);
router.get("/booking/paginate", findAllPaginatedBooking);
router.get("/booking/:id", bookingInfo);
router.get("/student/booking/:username", getStudentBooking);
router.get("/teacher/booking/:username", getTeacherBorrowedBooks);
router.post("/booking", createBooking);
router.delete("/student/booking/return", studentReturnBook);
router.delete("/teacher/booking/return", teacherReturnBook);

export default router;
