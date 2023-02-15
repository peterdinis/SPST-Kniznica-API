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
router.get("/booking/me/:id", myBorrowedBooks);
router.post("/booking/:bookId/:id", createNewBooking);

export default router;
