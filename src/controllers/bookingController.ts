import db from "../helpers/db";
import { Request, Response } from "express";
import validate from "../schemas/validateSchema";
import { borrowBookSchema } from "../schemas/bookingSchema";
import { AVAIABLE, NONAVAIABLE } from "../constants/bookStatus";

export const findAllBookings = async (req: Request, res: Response) => {
  const findAllBookings = await db.booking.findMany({});
  return findAllBookings;
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

  return findBookingDetail;
};

export const displayMyBorrowedBooks = async (req: Request, res: Response) => {
  const { id } = req.params;

  const findAllMyBorrowedBooks = await db.booking.findMany({
    where: {
      id: Number(id),
    },
  });

  if (findAllMyBorrowedBooks.length === 0) {
    return res.status(200).json({
      message: "No borrowed books",
    });
  }

  return res.json(findAllMyBorrowedBooks);
};

export const createNewBooking = async (req: Request, res: Response) => {
  validate(borrowBookSchema);

  const { from, to, email, bookId } = req.body;

  const findStudentOrTeacher = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!findStudentOrTeacher) {
    res.status(404);
    throw new Error(`Student or teacher not found`);
  }

  const findOneBook = await db.book.findFirst({
    where: {
      id: bookId,
      status: AVAIABLE,
    },
  });

  if (findOneBook!.status === NONAVAIABLE) {
    return res.status(409).json({
      message:
        "Knihu si nemôžeme požičať lebo je nedostupná/knihu si niekto požičal",
    });
  }

  const createNewBooking = await db.booking.create({
    data: {
      ...req.body,
    },
  });

  await db.book.update({
    where: {
      id: bookId,
    },

    data: {
      status: NONAVAIABLE,
    },
  });

  return res.status(201).json({
    book: createNewBooking,
    message: "Nova objednávka bola vytvorená knihu máte dostupnú na 7 dní",
  });
};

export const returnBooking = (req: Request, res: Response) => {
  return;
};

export const updateBookingLength = (req: Request, res: Response) => {
    return;
}