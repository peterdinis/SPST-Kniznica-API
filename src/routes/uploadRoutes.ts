import express from "express";
import {
  uploadNewPhotoForStudent,
  removeOneImageForStudent,
} from "../controllers/uploadController"
import { upload } from "../middleware/multer"

const router = express.Router();

router.post("/api/upload/student/:username", upload.single("filepond"), uploadNewPhotoForStudent);
router.delete("/api/upload/student/image/:id/:username/delete",removeOneImageForStudent);

export default router;