import { Request, Response } from "express";
import db from "../helpers/db";
import { STUDENT, TEACHER } from "../constants/roles";
import { AVAIABLE, NONAVAIABLE } from "../constants/bookStatus";

export const displayAllBookings = async (req: Request, res: Response) => {
  const allBookings = await db.booking.findMany();
  return res.json(allBookings);
};

export const bookingInfo = async (req: Request, res: Response) => {
  return;
};

export const getMyBorrowedBooks = async (req: Request, res: Response) => {
  const findStudent = await db.student.findFirst({
    where: {
      email: String(req.query.email),
      role: STUDENT
    },
  });

  if (!findStudent) {
    res.status(404);
    throw new Error(`Student not found`);
  }

  const allMyBorrowedBooks = await db.booking.findFirst({
    where: {
      email: String(req.query.email),
    },
  });

  return res.json(allMyBorrowedBooks);
};

export const getMyTeacherBorrowedBooks = async (
  req: Request,
  res: Response
) => {
  const email = String(req.query.email);
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
      email: String(req.query.email),
    },
  });

  return res.json(allMyBorrowedBooks);
};

export const createNewBooking = async (req: Request, res: Response) => {
  const { from, to, email, bookId } = req.body;
  const findBook = await db.book.findFirst({
    where: {
      id: Number(bookId),
      status: AVAIABLE,
    },
  });

  if (findBook!.status === NONAVAIABLE) {
    res.status(409);
    throw new Error(
      `You can not borrow book because book status is nonavaiable`
    );
  }

  if (!findBook) {
    res.status(404);
    throw new Error(`Book not found`);
  }

  if (!email) {
    res.status(400);
    throw new Error(`Email does not exists`);
  }

  const createNewBooking = await db.booking.create({
    data: {
      email,
      from,
      to,
      bookId: Number(bookId),
    },
  });

  await db.book.update({
    where: {
      id: Number(bookId),
    },

    data: {
      status: NONAVAIABLE
    }
  })

  return res.json(createNewBooking);
};

export const extendedExistingBooking = async (req: Request, res: Response) => {
  return;
};

export const returnMyBorrowedBook = async (req: Request, res: Response) => {
  return;
};

export const deleteAllBooking = async (req: Request, res: Response) => {
  return;
};
