import express from "express";
import { createCategoryFn, displayAllCategoriesFn } from "../controllers/categoryController";

const router = express.Router();

router.get("/category", displayAllCategoriesFn);
router.post("/category", createCategoryFn);

export default router;