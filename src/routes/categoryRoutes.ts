import express from "express";
import {
  categoryDetailsFn,
  createCategoryFn,
  displayAllCategoriesFn,
  searchCategory
} from "../controllers/categoryController";

const router = express.Router();

router.get("/categories", displayAllCategoriesFn);
router.get("/category/:externalId", categoryDetailsFn);
router.post("/category", createCategoryFn);
router.get("/category/search", searchCategory);

export default router;
