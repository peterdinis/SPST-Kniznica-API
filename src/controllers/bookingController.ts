import {Request, Response} from "express";
import db from "../helpers/db";
import { createBookingType } from "../schemas/bookingSchema";

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

export const getMyBooking = async (req: Request, res: Response) => {
    const {username} = req.params;
    const myBooking = await db.booking.findMany({
        where: {
            username
        }
    })

    return res.json(myBooking);
}

export const createBooking = async (req: Request<{}, {}, createBookingType>, res: Response) => {
    const {from, to, username, bookId} = req.body;
    const findBookForBorrow = await db.booking.findUnique({
        where: {
            id: bookId
        }
    })

    if(!findBookForBorrow) {
        throw new Error("Book not found")
    }

    const createNewBooking = await db.booking.create({
        data: {
            from,
            to,
            username,
            bookId
        }
    })

    return res.json(createNewBooking);
}

export const returnBooking = (req: Request, res: Response) => {
    return
}