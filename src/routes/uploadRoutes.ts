import express from "express";
import { checkGoFileServerStatus } from "../controllers/uploadController";

const router = express.Router();

router.get("/upload/server/status", checkGoFileServerStatus);

export default router;