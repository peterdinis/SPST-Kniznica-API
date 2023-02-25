import express from "express";
import { createNewBooking, displayAllBookings} from "../controllers/bookingController";

const router = express.Router();

router.get("/bookings", displayAllBookings)
router.post("/booking", createNewBooking);

export default router;