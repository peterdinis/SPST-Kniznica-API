import { Request, Response } from "express";
import db from "../helpers/db";
import { STUDENT, TEACHER } from "../constants/roles";

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsersInApp = await db.user.findMany();
  if (!allUsersInApp) {
    res.status(404);
    throw new Error("No users found");
  }
  return res.json(allUsersInApp);
};

export const getAllStudents = async (req: Request, res: Response) => {
  const allStudentsInApp = await db.user.findMany({
    where: {
      role: STUDENT,
    },
  });

  if (!getAllStudents) {
    res.status(404);
    throw new Error("No Students found");
  }

  return res.json(allStudentsInApp);
};

export const getAllTeachers = async (req: Request, res: Response) => {
  const allTeachersInApp = await db.user.findMany({
    where: {
      role: TEACHER,
    },
  });

  if (!allTeachersInApp) {
    res.status(404);
    throw new Error("No Teachers found");
  }

  return allTeachersInApp;
};

export const getAllImagesFromCloudinary = async (
  req: Request,
  res: Response
) => {
  return;
};

export const deleteAllImagesFromCloudinary = async (
  req: Request,
  res: Response
) => {
  return;
};

export const findAllBookings = async (req: Request, res: Response) => {
  const findAllBookings = await db.booking.findMany({});
  return res.json(findAllBookings);
};

export const findBookingDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  const findBookingDetail = await db.booking.findUnique({
    where: { id: Number(id) },
  });

  if (!findBookingDetail) {
    return res.status(404).json({
      message: "Booking with this id not found",
    });
  }

  return res.json(findBookingDetail);
};

export const studentDetail = (req: Request, res: Response) => {
    return;
}

export const teacherDetail = async(req: Request, res: Response) => {
    return;
}