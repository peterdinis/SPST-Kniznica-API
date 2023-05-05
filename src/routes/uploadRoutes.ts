import express from "express";
import {
  uploadNewPhoto,
  removeOneImage,
} from "../controllers/uploadController"
import { upload } from "../middleware/multer"

const router = express.Router();

router.post("/api/upload/:username", upload.single("filepond"), uploadNewPhoto);
router.delete("/api/upload/image/:id/delete", removeOneImage);

export default router;