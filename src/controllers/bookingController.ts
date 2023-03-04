import {Request, Response} from "express";
import db from "../helpers/db";

export const getAllBooking = async (req: Request, res: Response) => {
   const allBookings = await db.booking.findMany();
   return res.json(allBookings);
}

export const bookingInfo = async (req: Request, res: Response) => {
    const {id} = req.params;
    const bookInfo = await db.booking.findFirst({
        where: {
            id: Number(id)
        }
    })

    if(!bookInfo) {
        throw new Error("Booking not found");
    }

    return res.json(bookInfo);
}

export const getMyBooking = (req: Request, res: Response) => {
    return;
}

export const createBooking = (req: Request, res: Response) => {
    return;
}

export const returnBooking = (req: Request, res: Response) => {
    return
}