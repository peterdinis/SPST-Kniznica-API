import express from "express";
import {
  adminExample,
  adminProfile,
  loginAdmin,
  registerAdmin,
} from "../controllers/adminController";

const router = express.Router();

router.get("/admin/example", adminExample);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile", adminProfile);

export default router;
