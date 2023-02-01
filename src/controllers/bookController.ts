import { PrismaClient } from "@prisma/client";
import {Request, Response } from "express";

const prisma = new PrismaClient();

export const displayAllBooksFn = async (req: Request, res: Response) => {
    const allBooks = await prisma.book.findMany();
    return res.json(allBooks);
}