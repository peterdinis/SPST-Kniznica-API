import express from "express";
import {
  bookingInfo,
  createBooking,
  findAllPaginatedBooking,
  getAllBooking,
  getMyBorrowedBooks,
  returnBook,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/bookings", getAllBooking);
router.get("/booking/paginate", findAllPaginatedBooking);
router.get("/booking/:id", bookingInfo);
router.get("/student/booking/:username", getMyBorrowedBooks);
router.post("/booking", createBooking);
router.delete("/student/booking/return", returnBook);

export default router;
