import express from "express";
import { createAuthor, findAllPaginatedAuthors, getAllAuthors } from "../controllers/authorController";

const router = express.Router();

router.get("/authors", getAllAuthors)
router.get("/authors/search", findAllPaginatedAuthors);
router.post("/authors", createAuthor);

export default router;