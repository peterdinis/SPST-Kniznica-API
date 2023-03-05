import {Request, Response} from "express";
import db from "../helpers/db";
import { createBookingType, returnBookingType } from "../schemas/bookingSchema";
import { NONAVAIABLE } from "../constants/bookStatus";

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
            id: Number(bookId)
        }
    })
    const createNewBooking = await db.booking.create({
        data: {
            from,
            to,
            username,
            bookId: Number(bookId)
        }
    })

    await db.book.update({
        where: {
            id: Number(bookId)
        },

        data: {
            status: NONAVAIABLE
        }
    })

    // TODO: Add books names to return later not bookIds
    return res.json(createNewBooking);
}

export const returnBooking = (req: Request<{}, {}, returnBookingType>, res: Response) => {
    return;
}