import express from "express";
import {
  getPhotoDetail,
  uploadNewPhoto,
  removeOneImage,
} from "../controllers/uploadController"
import { upload } from "../middleware/multer"

const router = express.Router();

router.get("/api/upload/detail/:id", getPhotoDetail);
router.post("/api/upload", upload.single("filepond"), uploadNewPhoto);
router.delete("/api/upload/image/:id/delete", removeOneImage);

export default router;