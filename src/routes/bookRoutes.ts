import express from "express";
import {
  createBookFn,
  deleteBookFn,
  displayAllBooksFn,
  displayOneBookFn,
  findAllPaginatedBooks,
  searchBook,
  updateBookFn,
} from "../controllers/bookController";

const router = express.Router();

router.get("/books", displayAllBooksFn);
router.get("/books/paginate", findAllPaginatedBooks);
router.get("/book/:externalId", displayOneBookFn);
router.get("/books/search", searchBook);
router.post("/books", createBookFn);
router.put("/book/:id", updateBookFn);
router.delete("/book/:id", deleteBookFn);

export default router;
