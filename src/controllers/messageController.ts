import { Request, Response } from "express";
import db from "../db";

export const getAllMessages = async (req: Request, res: Response) => {
    const allMessages = await db.message.findMany();
    return res.json(allMessages);
}

export const getMyMessages = async (req: Request, res: Response) => {
    const {username} = req.params;

    const findMyMessages = await db.message.findMany({
        where: {
            forUsername: username
        }
    })

    if(!findMyMessages || findMyMessages.length === 0) {
        throw new Error("No messages found");
    }

    return res.json(findMyMessages);
}



export const messageDetail = async (req: Request, res: Response) => {
    const {id} = req.params;

    const findMessageDetail = await db.message.findFirst({
        where: {
            id: Number(id)
        }
    });

    if(!findMessageDetail) {
        throw new Error("No message found");
    }

    return res.json(findMessageDetail);
}

export const deleteMessage = async (req: Request, res: Response) => {
    const {id} = req.params;

    const findMessageDetail = await db.message.findFirst({
        where: {
            id: Number(id)
        }
    });

    if(!findMessageDetail) {
        throw new Error("No message found");
    }

    const deleteMyMessage = await db.message.delete({
        where: {
            id: findMessageDetail.id
        }
    })

    if(!deleteMyMessage) {
        throw new Error("Failed to delete message");
    }

    return res.json({
        message: "Your message was deleted"
    });
}