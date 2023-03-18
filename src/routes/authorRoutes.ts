import express from "express";
import { findAllPaginatedAuthors, getAllAuthors } from "../controllers/authorController";

const router = express.Router();

router.get("/authors", getAllAuthors)
router.get("/authors/search", findAllPaginatedAuthors);

export default router;