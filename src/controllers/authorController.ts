import db from "../db";
import { Request, Response } from "express";

export const getAllAuthors = async (req: Request, res: Response) => {
    const allAuthors = await db.author.findMany();
    return res.json(allAuthors);
}