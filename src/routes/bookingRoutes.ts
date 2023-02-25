import express from "express";
import { createNewBooking, displayAllBookings, getMyBorrowedBooks, getMyTeacherBorrowedBooks } from "../controllers/bookingController";

const router = express.Router();

router.get("/student/borrowed/:email", getMyBorrowedBooks);
router.get("/teacher/borrowed/:email", getMyTeacherBorrowedBooks);
router.get("/bookings", displayAllBookings)
router.post("/booking", createNewBooking);

export default router;