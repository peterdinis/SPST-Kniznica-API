import express from "express";
import { deleteMessage, getAllMessages, getMyMessages, messageDetail } from "../controllers/messageController";

const router = express.Router();

router.get("/messages/all", getAllMessages);
router.get("/messages/my/:username", getMyMessages);
router.get("/message/:id", messageDetail);
router.delete("/message/delete/:id", deleteMessage);

export default router;