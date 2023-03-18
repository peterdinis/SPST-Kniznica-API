import express from "express";
import { getAllAuthors } from "../controllers/authorController";

const router = express.Router();

router.get("/authors", getAllAuthors)

export default router;