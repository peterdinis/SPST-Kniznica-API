import express from "express";
import { createBookFn, deleteBookFn, displayAllBooksFn, displayOneBookFn, searchBook, updateBookFn } from "../controllers/bookController";

const router = express.Router();

router.get("/books", displayAllBooksFn);
router.get("/book/:id", displayOneBookFn);
router.get("/books/search", searchBook);
router.post("/books", createBookFn);
router.put("/book/:id", updateBookFn);
router.delete("/book/:id", deleteBookFn);

export default router;