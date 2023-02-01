import express from "express";
import { createBookFn, deleteBookFn, displayAllBooksFn, displayOneBookFn, searchingForBookFn, updateBookFn } from "../controllers/bookController";

const router = express.Router();

router.get("/books", displayAllBooksFn);
router.get("/book/:id", displayOneBookFn);
router.post("/books", createBookFn);
router.get("/books/search/:name", searchingForBookFn);
router.put("/book/:id", updateBookFn);
router.delete("/book/:id", deleteBookFn);

export default router;