import express from "express";
import { adminExample } from "../controllers/adminController";

const router = express.Router();

router.get("/admin/example", adminExample)

export default router;