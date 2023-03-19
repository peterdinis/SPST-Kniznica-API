import express from "express";
import { upload } from "../server";
import { dowloadImage, getAllImages, getOneImage, uploadImage } from "../controllers/imageController";

const router = express.Router();

router.get("/images", getAllImages);
router.get("/image/:id", getOneImage);
router.get("/images/download/:imageName", dowloadImage);
router.post("/upload/image", upload.single("image"), uploadImage);

export default router;