import express from "express";
import {
  booksPagination,
  createBookFn,
  deleteBookFn,
  displayAllBooksFn,
  displayOneBookFn,
  findAllAvaiableBooks,
  searchBook,
  updateBookFn,
} from "../controllers/bookController";

const router = express.Router();

router.get("/books", displayAllBooksFn);
router.get("/books/avaiable", findAllAvaiableBooks);
router.get("/books/paginate", booksPagination);
router.get("/book/:id", displayOneBookFn);
router.get("/books/search", searchBook);
router.post("/books", createBookFn);
router.put("/book/:id", updateBookFn);
router.delete("/book/:id", deleteBookFn);

export default router;
