import express from "express";
import { uploadImageForStudent } from "../controllers/imageController";
import { upload } from "../helpers/multer";

const router = express.Router();


router.post("/student/:username/upload", upload.single("file"), uploadImageForStudent);

export default router;