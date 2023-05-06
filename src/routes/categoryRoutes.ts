import express from "express";
import {
  categoryDetailsFn,
  createCategoryFn,
  deleteCategory,
  displayAllCategoriesFn,
  updateCategory
} from "../controllers/categoryController";

const router = express.Router();

router.get("/categories", displayAllCategoriesFn);
router.get("/category/:externalId", categoryDetailsFn);
router.post("/category", createCategoryFn);
router.patch("/category/:id",  updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;
