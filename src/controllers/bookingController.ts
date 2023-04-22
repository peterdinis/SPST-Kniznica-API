import { Request, Response } from "express";
import db from "../db";
import {
  createBookingType,
  returnBookingType,
} from "../validators/bookingSchema";
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

export const getMyBorrowedBooks = async (req: Request, res: Response) => {
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
  const { from, to, username, bookExternalId } = req.body;

  const createNewBooking = await db.booking.create({
    data: {
      from,
      to,
      username,
      bookExternalId,
    },
  });

  const findExistingBook = await db.book.findFirst({
    where: {
      externalId: bookExternalId,
    },
  });

  await db.book.update({
    where: {
      id: findExistingBook!.id,
    },

    data: {
      status: NONAVAIABLE,
    },
  });

  return res.json(createNewBooking);
};

export const returnBook = async (
  req: Request<{}, {}, returnBookingType>,
  res: Response
) => {
  const { username, bookExternalId } = req.body;

  const myBooking = await db.booking.findFirst({
    where: {
      bookExternalId,
      username,
    },
  });

  if (!myBooking) {
    return res.status(404).json("Booking not found");
  }

  const removeBookFromBooking = await db.booking.delete({
    where: {
      id: myBooking.id,
    },
  });

  const findExistingBook = await db.book.findFirst({
    where: {
      externalId: bookExternalId,
    },
  });

  const updateBookAfterBooking = await db.book.update({
    where: {
      id: findExistingBook!.id,
    },

    data: {
      status: AVAIABLE,
    },
  });

  await db.message.create({
    data: {
      name: "Vrátenie knihy",
      description: `Používateľ ${username} vrátil knihu ${updateBookAfterBooking.name}`,
    },
  });

  return res.json(removeBookFromBooking);
};
