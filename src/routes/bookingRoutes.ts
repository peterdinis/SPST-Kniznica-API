import express from "express";
import {
  createNewBooking,
  findAllBookings,
  findBookingDetails,
  myBorrowedBooks,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/booking", findAllBookings);
router.get("/booking/:id", findBookingDetails);
router.get("/booking/me/:userId", myBorrowedBooks);
router.post("/booking/:bookId/:userId", createNewBooking);

export default router;
