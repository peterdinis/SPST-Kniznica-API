import express from "express";
import { adminExampleRoute } from "../controllers/adminController";

const router = express.Router();

router.get("/admin/example", adminExampleRoute)

export default router;