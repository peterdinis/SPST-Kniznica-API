import express from "express";
import { bookingInfo, createBooking, getAllBooking, getMyBooking } from "../controllers/bookingController";

const router = express.Router();

router.get("/bookings", getAllBooking);
router.get("/booking/:id", bookingInfo);
router.get("/me/booking/:username", getMyBooking);
router.post("/booking", createBooking);

export default router;