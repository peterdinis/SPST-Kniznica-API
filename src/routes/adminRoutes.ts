import express from "express";
import {
  adminProfile,
  loginAdmin,
  registerAdmin,
} from "../controllers/adminController";

const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile", adminProfile);

export default router;
