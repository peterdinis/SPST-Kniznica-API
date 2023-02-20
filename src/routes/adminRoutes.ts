import express from "express";
import { findAllBookings, findBookingDetails, getAllStudents, getAllTeachers, getAllUsers } from "../controllers/adminController";

const router = express.Router();

router.get("/admin/users", getAllUsers);
router.get("/admin/students", getAllStudents);
router.get("/admin/teachers", getAllTeachers);
router.get("/admin/booking", findAllBookings);
router.get("/admin/booking/:id", findBookingDetails);

export default router;