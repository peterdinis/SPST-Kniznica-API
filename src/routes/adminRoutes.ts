import express from "express";
import {
  adminExample,
  adminProfile,
  loginAdmin,
  registerAdmin,
  getAllPhotos,
  deleteAllImages,
  getPhotoDetail,
} from "../controllers/adminController";

const router = express.Router();

router.get("/admin/example", adminExample);
router.get("/admin/upload/all", getAllPhotos);
router.get("/api/upload/detail/:id", getPhotoDetail);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile", adminProfile);
router.delete("/admin/upload/images/delete", deleteAllImages);

export default router;
