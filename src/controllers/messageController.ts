import { Request, Response } from "express";
import db from "../db";

export const getAllMessages = async (req: Request, res: Response) => {
    const allMessages = await db.message.findMany();
    return res.json(allMessages);
}