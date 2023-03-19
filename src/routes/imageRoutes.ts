import express from "express";
import { upload } from "../server";
import { uploadImage } from "../controllers/imageController";

const router = express.Router();

router.post("/upload/image", upload.single("image"), uploadImage);

export default router;