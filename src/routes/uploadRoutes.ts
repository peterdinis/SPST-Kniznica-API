import express from "express";
import { checkAccountInfo, checkGoFileServerStatus, uploadPictureForStudent, uploadPictureForTeacher } from "../controllers/uploadController";

const router = express.Router();

router.get("/upload/account/status", checkAccountInfo);
router.get("/upload/server/status", checkGoFileServerStatus);
router.patch("/upload/:id/new", uploadPictureForStudent);
router.patch("/upload/teacher/:id/new", uploadPictureForTeacher);

export default router;