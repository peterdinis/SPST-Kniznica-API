import express from "express";
import {
  changeStudentPassword,
  deleteProfile,
  displayAllStudents,
  loginStudent,
  profileFn,
  registerStudent,
  studentProfilePicture,
  updateProfile,
} from "../controllers/studentController";
import isLogged from "../middleware/isLogged";

const router = express.Router();

router.get("/students", displayAllStudents);
router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);
router.get("/student/profile", isLogged, profileFn);
router.post("/student/:id/picture/upload", studentProfilePicture);
router.patch("/student/:id/update", updateProfile);
router.patch("/student/:id/password/update", changeStudentPassword)
router.delete("/student/:id/delete", deleteProfile);

export default router;
