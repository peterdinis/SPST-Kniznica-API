import { Request, Response } from "express";
import db from "../db";
import { createBookingType, returnBookingType } from "../schemas/bookingSchema";
import { AVAIABLE, NONAVAIABLE } from "../constants/bookStatus";
import paginator from "prisma-paginate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const getAllBooking = async (req: Request, res: Response) => {
  const allBookings = await db.booking.findMany();
  return res.json(allBookings);
};

export const findAllPaginatedBooking = async (req: Request, res: Response) => {
  const allPaginatedBooks = await paginate.booking.paginate({
    page: Number(req.query.page) as unknown as number,
    limit: Number(req.query.limit) as unknown as number,
  });
  return res.json(allPaginatedBooks);
};

export const bookingInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookInfo = await db.booking.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!bookInfo) {
    throw new Error("Booking not found");
  }

  return res.json(bookInfo);
};

export const getMyBooking = async (req: Request, res: Response) => {
  const { username } = req.params;
  const myBooking = await db.booking.findMany({
    where: {
      username,
    },
  });

  return res.json(myBooking);
};

export const createBooking = async (
  req: Request<{}, {}, createBookingType>,
  res: Response
) => {
  const { from, to, username, bookId } = req.body;
  const findBookForBorrow = await db.booking.findUnique({
    where: {
      id: Number(bookId),
    },
  });
  const createNewBooking = await db.booking.create({
    data: {
      from,
      to,
      username,
      bookId: Number(bookId),
    },
  });

  await db.book.update({
    where: {
      id: Number(bookId),
    },

    data: {
      status: NONAVAIABLE,
    },
  });

  // TODO: Add books names to return later not bookIds
  return res.json(createNewBooking);
};

/* TODO: Update this fn */
export const returnBooking = async (
  req: Request<{}, {}, returnBookingType>,
  res: Response
) => {
  const { username, bookId } = req.body;

  const findExistingUser = await db.student.findFirst({
    where: {
      username,
    },
  });

  if (!findExistingUser) {
    return res.status(404).json("Student not found");
  }

  const findBorrowedBook = await db.booking.findFirst({
    where: {
      bookId,
    },
  });

  if (!findBorrowedBook) {
    res.status(404).json("Borrowed Book not found");
  }

  const returnBorrowedBook = await db.booking.delete({
    where: {
      id: findBorrowedBook!.bookId,
    },
  });

  await db.book.update({
    where: {
      id: findBorrowedBook!.bookId,
    },

    data: {
      status: AVAIABLE,
    },
  });

  return res.status(200).json(returnBorrowedBook);
};
