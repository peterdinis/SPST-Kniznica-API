import { NONAVAIABLE } from "../constants/bookStatus";
import db from "../helpers/db";
import {format, toDate} from "date-fns";
import { Request, Response } from "express";

export const myBorrowedBooks = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const findExistingUser = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!findExistingUser) {
    res.status(404);
    throw new Error("User with this id does not exist");
  }

  const userBorrowedBooks = await db.booking.findMany({
    where: {
      userId
    },
  });

  return res.json(userBorrowedBooks);
};


export const createNewBooking = async (req: Request, res: Response) => {
  const {name, lastName, from, to, userId, bookId} = req.body;

  const findStudentById = await db.user.findFirst({
    where: {
      id: userId
    }
  })

  if(!findStudentById) {
    res.status(404);
    throw new Error("Student with this id does not exist");
  }

  const findBookById = await db.book.findUnique({
    where: {
      id: Number(bookId) as any,
    }
  })

  if(!findBookById) {
    res.status(404);
    throw new Error("Book with this id does not exist")
  }

  if(findBookById.status === NONAVAIABLE) {
    res.status(400);
    throw new Error("Can not borrowed book because is not avaiable");
  }

  const newOrder = await db.booking.create({
    data: {
      name,
      lastName,
      bookId: Number(bookId),
      userId,
      from: format(toDate(from), "MM/dd/yyyy"),
      to: format(toDate(to), "MM/dd/yyyy")
    }
  })

  await db.book.update({
    where: {
      id: newOrder.bookId,
    },

    data: {
      status: NONAVAIABLE
    }
  })

  const findBorrowedBook = await db.book.findUnique({
    where: {
      id: newOrder.bookId,
    }
  })



  return res.status(201).json({
    message: "Požičanie knihy bolo úspesšné",
    requestedBook: findBorrowedBook!.name,
    orderInfo: newOrder
  });
}

export const returnBook = async (req: Request, res: Response) => {
  const {id, bookId, userId} = req.body;

  const findStudentById = await db.user.findFirst({
    where: {
      id: userId
    }
  })

  if(!findStudentById) {
    res.status(404);
    throw new Error("Student with this id does not exist");
  }

  const findBookById = await db.book.findUnique({
    where: {
      id: Number(bookId) as any,
    }
  })

  if(!findBookById) {
    res.status(404);
    throw new Error("Book with this id does not exist")
  }

  const returnBook = await db.booking.delete({
    where: {
      id
    }
  })

  console.log(returnBook);

  return res.status(200).json({
    message: "Kniha bola vrátená",
    requestedBook: findBookById.name,
  })
}

// default 7 days if we want to update to in our booking we call this endpoint
export const updateBookingTo = async(req: Request, res: Response) => {
  return;
}