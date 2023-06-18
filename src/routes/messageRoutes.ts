import express from "express";
import { getAllMessages } from "../controllers/messageController";

const router = express.Router();

router.get("/messages/all", getAllMessages);

export default router;