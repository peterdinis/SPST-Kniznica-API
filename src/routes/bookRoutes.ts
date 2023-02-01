import express from "express";
import { displayAllBooksFn } from "../controllers/bookController";

const router = express.Router();

router.get("/books", displayAllBooksFn);

export default router;