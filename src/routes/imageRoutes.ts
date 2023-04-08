import express from "express";
import { upload, uploadImageForStudent } from "../controllers/imageController";

const router = express.Router();


router.post("/:username/upload", upload.single("image"), uploadImageForStudent);

export default router;