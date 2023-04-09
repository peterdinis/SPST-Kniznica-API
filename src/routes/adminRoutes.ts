import express from "express";
import {
  adminExample,
  adminProfile,
  getAllAdminMessages,
  loginAdmin,
  getOneMessage,
  registerAdmin,
} from "../controllers/adminController";

const router = express.Router();

router.get("/admin/example", adminExample);
router.get("/admin/messages", getAllAdminMessages);
router.get("/admin/messages/:id", getOneMessage);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile", adminProfile);

export default router;
