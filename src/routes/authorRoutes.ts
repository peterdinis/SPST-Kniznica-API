import express from "express";
import {
  createAuthor,
  deleteAuthor,
  findAllPaginatedAuthors,
  getAllAuthors,
  getOneAuthor,
  searchForAuthor,
  updateAuthor,
} from "../controllers/authorController";

const router = express.Router();

router.get("/authors", getAllAuthors);
router.post("/authors", createAuthor);
router.get("/authors/search", searchForAuthor);
router.get("/authors/paginate", findAllPaginatedAuthors);
router.get("/authors/:externalId", getOneAuthor);
router.put("/author/:id", updateAuthor);
router.delete("/author/:id", deleteAuthor);

export default router;
