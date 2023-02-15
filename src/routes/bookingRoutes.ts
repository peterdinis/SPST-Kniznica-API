import express from "express";
import { createNewBooking, displayMyBorrowedBooks, findAllBookings, findBookingDetails } from "../controllers/bookingController";

const router = express.Router();

router.get("/bookings", findAllBookings);
router.get("/booking/:id", findBookingDetails);
router.get("/booking/me/:id", displayMyBorrowedBooks);
router.post("/bookings", createNewBooking);

export default router;