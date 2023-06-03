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
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/authors", getAllAuthors);
router.get("/authors/search", searchForAuthor);
router.get("/authors/paginate", findAllPaginatedAuthors);
router.get("/authors/:externalId", getOneAuthor);
router.post("/authors", upload.single("image"), createAuthor);
router.patch("/author/:id", updateAuthor);
router.delete("/author/:id", deleteAuthor);

export default router;
