import express from "express";
import {
  createNewBooking,
  myBorrowedBooks,
  returnBook,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/booking/me/:userId", myBorrowedBooks);
router.post("/booking", createNewBooking);
router.delete("/booking/return", returnBook);

export default router;
