import express from "express";
import { displayAllCategoriesFn } from "../controllers/categoryController";

const router = express.Router();

router.get("/categories", displayAllCategoriesFn);

export default router;