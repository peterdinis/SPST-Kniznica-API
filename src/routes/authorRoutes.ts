import express from "express";
import {
  createAuthor,
  deleteAuthor,
  findAllPaginatedAuthors,
  getAllAuthors,
  getOneAuthor,
  updateAuthor,
} from "../controllers/authorController";

const router = express.Router();

router.get("/authors", getAllAuthors);
router.get("/authors/paginate", findAllPaginatedAuthors);
router.get("/authors/:externalId", getOneAuthor);
router.post("/authors", createAuthor);
router.patch("/author/:id", updateAuthor);
router.delete("/author/:id", deleteAuthor);

export default router;
