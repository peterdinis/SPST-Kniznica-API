import express from "express";
import { createAuthor, findAllPaginatedAuthors, getAllAuthors, getOneAuthor} from "../controllers/authorController";

const router = express.Router();

router.get("/authors", getAllAuthors);
router.get("/authors/paginate", findAllPaginatedAuthors);
router.get("/authors/:id", getOneAuthor);
router.post("/authors", createAuthor);

export default router;