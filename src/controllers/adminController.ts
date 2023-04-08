import {Request, Response} from "express";
import db from "../db";

export const adminExample = (req: Request, res: Response) => {
    return res.send("Admin example route");
}

export const getAllAdminMessages = async (req: Request, res: Response) => {
    const allAdminMesages = await db.message.findMany();
    return res.json(allAdminMesages);
}

export const registerAdmin = (req: Request, res: Response) => {
    return;
}

export const loginAdmin = (req: Request, res: Response) => {
    return;
}

export const adminProfile = (req: Request, res: Response) => {
    return;
}