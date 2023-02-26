import express from "express";

const router = express.Router();

router.get("/students", getAllStudents)

export default router