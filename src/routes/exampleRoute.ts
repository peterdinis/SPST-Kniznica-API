import express from "express";
import { exampleFn, generateRandomId } from "../controllers/exampleController";

const router = express.Router();

router.get("/example", exampleFn);
router.get("/generate/id", generateRandomId);

export default router;