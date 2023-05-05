import express from "express";
import {
  uploadNewPhoto,
  removeOneImage,
} from "../controllers/uploadController"
import { upload } from "../middleware/multer"

const router = express.Router();

router.post("/api/upload/student/:username", upload.single("filepond"), uploadNewPhoto);
router.delete("/api/upload/student/image/:id/:username/delete", removeOneImage);

export default router;