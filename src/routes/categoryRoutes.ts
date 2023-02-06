import express from "express";
import {
  categoryDetailsFn,
  createCategoryFn,
  displayAllCategoriesFn,
  searchCategory,
} from "../controllers/categoryController";

const router = express.Router();

router.get("/category", displayAllCategoriesFn);
router.get("/category/:id", categoryDetailsFn);
// router.get("/categories/search", searchCategory);
router.post("/category", createCategoryFn);

export default router;
