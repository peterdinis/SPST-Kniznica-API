import express from "express";
import { displayAllStudents, displayOneStudent, loginStudent, profileFn, registerStudent, studentProfilePicture} from "../controllers/studentController";
import isLogged from "../middleware/isLogged";
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/students", displayAllStudents);
router.get("/student/:id", displayOneStudent);
router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);
router.get("/student/profile", isLogged, profileFn);
router.post("/student/:id/picture/upload", upload.single("profileImg"), studentProfilePicture);

export default router;