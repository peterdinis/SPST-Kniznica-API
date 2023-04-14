import express from "express";
import { createAuthor, findAllPaginatedAuthors, getAllAuthors, getOneAuthor, searchAuthor} from "../controllers/authorController";

const router = express.Router();

router.get("/authors", getAllAuthors);
router.get("/authors/paginate", findAllPaginatedAuthors);
router.get("/authors/:id", getOneAuthor);
router.get("/authors/search", searchAuthor);
router.post("/authors", createAuthor);

export default router;