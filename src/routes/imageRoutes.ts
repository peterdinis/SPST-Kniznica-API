import express from "express";
import { getAllImages, testUploadImage } from "../controllers/imageController";

const router = express.Router();

router.get("/images", getAllImages);
router.post("/image/upload", testUploadImage);

export default router;