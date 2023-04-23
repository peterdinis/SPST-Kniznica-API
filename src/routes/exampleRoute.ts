import express from "express";
import { exampleFn } from "../controllers/exampleController";

const router = express.Router();

router.get("/example", exampleFn);

export default router;