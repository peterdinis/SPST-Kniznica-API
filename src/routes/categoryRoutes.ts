import express from "express";
import {
  categoryDetailsFn,
  createCategoryFn,
  deleteCategory,
  displayAllCategoriesFn,
  searchCategory,
  updateCategory
} from "../controllers/categoryController";

const router = express.Router();

router.get("/categories", displayAllCategoriesFn);
router.get("/category/:externalId", categoryDetailsFn);
router.post("/category", createCategoryFn);
router.get("/category/search", searchCategory);
router.patch("/book/:id",  updateCategory);
router.delete("/book/:id", deleteCategory);

export default router;
