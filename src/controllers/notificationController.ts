import { Request, Response } from "express";
import db from "../db";

export const getAllNotifications = async (req: Request, res: Response) => {
    const allNotifications = await db.notification.findMany();
    return res.json(allNotifications);
}