import express from "express";
import { bookingInfo, createBooking, getAllBooking, getMyBooking, returnBooking } from "../controllers/bookingController";

const router = express.Router();

router.get("/bookings", getAllBooking);
router.get("/booking/:id", bookingInfo);
router.get("/me/booking/:username", getMyBooking);
router.post("/booking", createBooking);
router.delete("/me/booking", returnBooking);

export default router;