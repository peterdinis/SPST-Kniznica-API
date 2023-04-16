import { Request, Response } from "express";
import db from "../db";

export const getAllMessages = async (req: Request, res: Response) => {
    const allMessages = await db.message.findMany();
    return res.json(allMessages);
}

export const getMessageInfo = async (req: Request, res: Response) => {
    const {id} = req.params;

    const findMessage = await db.message.findFirst({
        where: {
            id: Number(id)
        }
    })

    if(!findMessage) {
        return res.status(404).json("Message not found");
    }

    return res.json(findMessage);
}

export const deleteMessage = async (req: Request, res: Response) => {
    const {id} = req.params;

    const deleteMessage = await db.message.delete({
        where: {
            id: Number(id)
        }
    });

    if(!deleteMessage) {
        return res.status(404).json("Message not found");
    }

    return res.json(deleteMessage)
}

export const deleteMessages = async (req: Request, res: Response) => {
    const removeAllMessages = await db.message.deleteMany();
    return res.json(removeAllMessages);
}