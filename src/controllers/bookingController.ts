import db from "../helpers/db";
import { Request, Response } from "express";

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

export const myBorrowedBooks = async (req: Request, res: Response) => {
  const {id} = req.params;
  
  const findExistingUser = await db.user.findFirst({
    where: {
      id
    }
  })

  if(!findExistingUser) {
    res.status(404);
    throw new Error("User with this id does not exist");
  }

  const userBorrowedBooks = await db.booking.findMany({
    where: {
      userId: id
    }
  })

  return res.json(userBorrowedBooks);
}