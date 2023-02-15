import express from "express";
import { findAllBookings, findBookingDetails } from "../controllers/bookingController";

const router = express.Router();

router.get("/booking", findAllBookings);
router.get("/booking/:id", findBookingDetails);

export default router;