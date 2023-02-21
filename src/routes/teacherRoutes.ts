import express from "express";
import { registerTeacher, loginTeacher, teacherProfile } from "../controllers/teacherController";
import isLogged from "../middleware/isLogged";

const router = express.Router();

router.post("/teacher/register", registerTeacher);
router.post("/teacher/login", loginTeacher);
router.get("/teacher/profile", isLogged, teacherProfile);

export default router