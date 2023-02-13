import db from "../helpers/db";
import { Request, Response } from "express";
 
export const findAllBookings = async (req: Request, res: Response) => {
    const findAllBookings = await db.booking.findMany({});
    return findAllBookings;
}

export const findBookingDetails = async (req: Request, res: Response) => {
    const {id} = req.params;

    const findBookingDetail = await db.booking.findUnique({
        where: {id: Number(id)},
    })

    if(!findBookingDetail) {
        return res.status(404).json({
            message: "Booking with this id not found"
        })
    }

    return findBookingDetail;
}

export const displayMyBorrowedBooks = async (req: Request, res: Response) => {
    const {email} = req.params;
    
    const findAllMyBorrowedBooks = await db.booking.findMany({
        where: {
            email
        }
    })

    if(findAllMyBorrowedBooks.length === 0) {
        return res.status(200).json({
            message: "No borrowed books"
        })
    }

    return res.json(findAllMyBorrowedBooks);
}

export const createNewBooking = (req: Request, res: Response) => {
    return;
}

export const returnBooking = (req: Request, res: Response) => {
    return;
}