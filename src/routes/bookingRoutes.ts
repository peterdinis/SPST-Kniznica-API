import express from "express";
import {
  myBorrowedBooks,
} from "../controllers/bookingController";

const router = express.Router();

router.get("/booking/me/:username", myBorrowedBooks);

export default router;
