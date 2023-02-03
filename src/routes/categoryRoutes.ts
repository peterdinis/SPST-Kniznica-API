import express from "express";
import { categoryDetailsFn, createCategoryFn, displayAllCategoriesFn } from "../controllers/categoryController";

const router = express.Router();

router.get("/category", displayAllCategoriesFn);
router.get("/category/:id", categoryDetailsFn);
router.post("/category", createCategoryFn);

export default router;