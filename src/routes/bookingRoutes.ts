import express from "express";
import {
  createNewBooking,
  extensionForBook,
  findAllBookings,
  findBookingDetails,
  myBorrowedBooks,
  returnBook,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/booking", findAllBookings);
router.get("/booking/:id", findBookingDetails);
router.get("/booking/me/:userId", myBorrowedBooks);
router.post("/booking/:bookId/:userId", createNewBooking);
router.delete("/booking/:bookId", returnBook);
router.patch("/booking/:bookId/:userId/update", extensionForBook);

export default router;
