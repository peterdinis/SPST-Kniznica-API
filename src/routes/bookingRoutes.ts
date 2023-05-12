import express from "express";
import {
  bookingInfo,
  createBooking,
  getAllBooking,
  getMyBorrowedBooks,
  returnBook,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/bookings", getAllBooking);
router.get("/booking/:username", getMyBorrowedBooks);
router.get("/booking/:id", bookingInfo);
router.post("/booking", createBooking);
router.delete("/booking/return", returnBook);

export default router;
