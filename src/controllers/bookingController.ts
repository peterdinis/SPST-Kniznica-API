import db from "../helpers/db";
import { Request, Response } from "express";

export const myBorrowedBooks = async (req: Request, res: Response) => {
  const { username } = req.params;

  const findExistingUser = await db.user.findFirst({
    where: {
      id: username,
    },
  });

  if (!findExistingUser) {
    res.status(404);
    throw new Error("User with this username does not exist");
  }

  const userBorrowedBooks = await db.booking.findMany({
    where: {
      username
    },
  });

  return res.json(userBorrowedBooks);
};

export const createNewBooking = async(req: Request, res: Response) => {
  return;
}