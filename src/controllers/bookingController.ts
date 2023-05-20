import { Request, Response } from "express";
import db from "../db";
import {
  createBookingType,
  returnBookingType,
} from "../validators/bookingSchema";
import { AVAIABLE, NONAVAIABLE } from "../constants/bookStatus";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import dayjs from "dayjs";

export const getAllBooking = async (req: Request, res: Response) => {
  try {
    const allBookings = await db.booking.findMany();
    return res.json(allBookings);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const getMyBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const myBooking = await db.booking.findMany({
      where: {
        username,
      },
    });

    return res.json(myBooking);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const bookingInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookInfo = await db.booking.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!bookInfo) {
      return res.status(404).json("Book not found");
    }

    return res.json(bookInfo);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const createBooking = async (
  req: Request<{}, {}, createBookingType>,
  res: Response
) => {
  try {
    const { from, to, username, bookId } = req.body;

    const fromDay = dayjs(from);
    const toDay = dayjs(to);
    const actualDay = new Date().toISOString();

    const findBookForBorrow = await db.book.findFirst({
      where: {
        id: Number(bookId)
      }
    })

    if(findBookForBorrow!.status === AVAIABLE) {
      return res.status(409).json("Nemôžem vykonať operáciu lebo kniha je ")
    }

    const testStudentUsername = await db.student.findFirst({
      where: {
        username,
      },
    
    });

    if(!testStudentUsername) {
      const testTeacherUsername = await db.teacher.findFirst({
        where: {
          username,
        },
      });

      if(!testTeacherUsername) {
        const testAdminUsername = await db.admin.findFirst({
          where: {
            username,
          },
        });

        if(!testAdminUsername) {
          return res.status(409).json("Používateľ neexistuje");
        }
      }
    } 

    if (fromDay.isSame(toDay)) {
      return res
        .status(409)
        .json("Musí byť rozdiel medzi dátumi minimálne 1 deň");
    }

    if (fromDay.isBefore(actualDay)) {
      return res
        .status(409)
        .json("Zvolený dátum musí byť väčší ako aktuálny deň");
    }

    if (toDay.isBefore(actualDay)) {
      return res
        .status(409)
        .json("Zvolený dátum musí byť väčší ako aktuálny deň");
    }

    const createNewBooking = await db.booking.create({
      data: {
        from,
        to,
        username,
        bookId,
      },
    });

    const findExistingBook = await db.book.findFirst({
      where: {
        id: Number(bookId),
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
  } catch (err) {
    getErrorMessage(err);
  }
};

export const returnBook = async (
  req: Request<{}, {}, returnBookingType>,
  res: Response
) => {
  try {
    const { username, bookId } = req.body;

    const myBooking = await db.booking.findFirst({
      where: {
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
        id: Number(bookId),
      },
    });

    await db.book.update({
      where: {
        id: findExistingBook!.id,
      },

      data: {
        status: AVAIABLE,
      },
    });

    return res.json(removeBookFromBooking);
  } catch (err) {
    getErrorMessage(err);
  }
};
