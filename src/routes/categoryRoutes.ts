import express from "express";
import { displayAllCategoriesFn } from "../controllers/categoryController";

const router = express.Router();

router.get("/category", displayAllCategoriesFn);

export default router;