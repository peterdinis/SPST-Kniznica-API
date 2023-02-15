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

