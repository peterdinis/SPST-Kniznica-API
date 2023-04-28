import express from "express";
import {
  deleteMessage,
  deleteAllMessages,
  getAllMessages,
  getMessageInfo,
  updateMessageFn,
  deleteAllMyMessages,
} from "../controllers/messageController";

const router = express.Router();

router.get("/messages", getAllMessages);
router.get("/message/:id", getMessageInfo);
router.patch("/update/message/:id", updateMessageFn);
router.delete("/message/:id", deleteMessage);
router.delete("/messages", deleteAllMessages);
router.delete("/:username/delete/messages", deleteAllMyMessages);

export default router;
