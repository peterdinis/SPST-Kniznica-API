import express from "express";
import { loginStudent, profileFn, refreshTokenFn, registerStudent} from "../controllers/studentController";
import isLogged from "../middleware/isLogged";

const router = express.Router();

router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);
router.post("/token/refresh", refreshTokenFn);
router.get("/student/profile", isLogged, profileFn);

export default router;