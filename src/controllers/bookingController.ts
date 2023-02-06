import { Request, Response } from "express";
import db from "../helpers/db";


export const myBorrowedBooks = async (req: Request, res: Response) => {
   const myBorrowedBooks = await db.booking.findMany({
        where: {
            /* TODO: Update schema */
        }
   })
}

export const createNewOrder = (req: Request, res: Response) => {
    return;
}

export const returnOrder = (req: Request, res: Response) => {
    return;
}