import db from "../db";
import {Request, Response} from "express";
import fs from "fs";

export const uploadImage = async (req: any, res: Response) => {
    const imageName = req.file.filename;
    const description = req.body.description;

    const addImage = await db.image.create({
        data: {
            filename: imageName,
            description
        }
    });

    return res.send(addImage);
};

export const dowloadImage = async (req: Request, res: Response) => {
    return;
}