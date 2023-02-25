import { Request, Response } from "express";
import db from "../helpers/db";
import { STUDENT, TEACHER } from "../constants/roles";

export const getMyBorrowedBooks = async (req: Request, res: Response) => {
  const { email } = req.params;
  const findStudent = await db.student.findFirst({
    where: {
      email,
      role: STUDENT,
    },
  });

  if (!findStudent) {
    res.status(404);
    throw new Error(`Student not found`);
  }

  const allMyBorrowedBooks = await db.booking.findFirst({
    where: {
      email,
    },
  });

  return allMyBorrowedBooks;
};

export const getMyTeacherBorrowedBooks = async (req: Request, res: Response) => {
    const { email } = req.params;
    const findTeacher = await db.teacher.findFirst({
      where: {
        email,
        role: TEACHER,
      },
    });
  
    if (!findTeacher) {
      res.status(404);
      throw new Error(`Teacher not found`);
    }
  
    const allMyBorrowedBooks = await db.booking.findFirst({
      where: {
        email,
      },
    });
  
    return allMyBorrowedBooks;
};

export const createNewBooking = (req: Request, res: Response) => {
  return;
};

export const extendedExistingBooking = (req: Request, res: Response) => {
  return;
};

export const returnMyBorrowedBook = (req: Request, res: Response) => {
  return;
};

export const returnTeacherBorrowedBook = (req: Request, res: Response) => {
  return;
};
