import express from "express";
import { saveStudent, removeStudent, displayAllStudent } from "../controllers/studentController";

const router = express.Router();

router.get("/students", displayAllStudent);
router.post("/student", saveStudent);
router.delete("/student/delete/:email", removeStudent);

export default router