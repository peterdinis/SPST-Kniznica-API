import express from "express";
import {
  categoryDetailsFn,
  createCategoryFn,
  displayAllCategoriesFn,
  categoryPagination
} from "../controllers/categoryController";

const router = express.Router();

router.get("/categories/paginate", categoryPagination);
router.get("/categories", displayAllCategoriesFn);
router.get("/category/:id", categoryDetailsFn);
router.post("/category", createCategoryFn);

export default router;
