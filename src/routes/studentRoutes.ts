import express from "express";
import { registerStudent } from "../controllers/studentController";

const router = express.Router();

router.post("/student/register", registerStudent);

export default router;