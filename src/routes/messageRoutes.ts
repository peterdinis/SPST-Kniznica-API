import express from "express";
import {
  deleteMessage,
  deleteAllMessages,
  getAllMessages,
  getMessageInfo,
} from "../controllers/messageController";

const router = express.Router();

router.get("/messages", getAllMessages);
router.get("/message/:id", getMessageInfo);
router.delete("/message/:id", deleteMessage);
router.delete("/messages", deleteAllMessages);

export default router;
