import { STUDENT, TEACHER } from "../constants/roles";
import db from "../helpers/db";
import { Request, Response } from "express";

export const myBorrowedBooks = async (req: Request, res: Response) => {
  const { username } = req.params;

  const findExistingStudent = await db.user.findFirst({
    where: {
      username,
      role: STUDENT
    },
  });

  if (!findExistingStudent) {
    res.status(404);
    throw new Error("User with this username does not exist");
  }

  const studentBorrowedBooks = await db.booking.findMany({
    where: {
      username,
    },
  });

  return res.json(studentBorrowedBooks);
};

export const findTeacherBorrowedBooks = async(req: Request, res: Response) => {
  const { username } = req.params;

  const findExistingTeacher = await db.user.findFirst({
    where: {
      username,
      role: TEACHER
    },
  });

  if (!findExistingTeacher) {
    res.status(404);
    throw new Error("User with this username does not exist");
  }

  const teacherBorrowedBooks = await db.booking.findMany({
    where: {
      username,
    },
  });

  return res.json(teacherBorrowedBooks);
}

export const createNewBooking = async(req: Request, res: Response) => {
  return;
}