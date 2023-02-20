import express from "express";
import { checkAccountInfo, checkGoFileServerStatus } from "../controllers/uploadController";

const router = express.Router();

router.get("/upload/account/status", checkAccountInfo);
router.get("/upload/server/status", checkGoFileServerStatus);

export default router;