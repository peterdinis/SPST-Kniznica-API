import express from "express";
import { loginStudent, profileFn, registerStudent} from "../controllers/studentController";
import isLogged from "../middleware/isLogged";

const router = express.Router();

router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);
router.get("/student/profile", isLogged, profileFn);

export default router;