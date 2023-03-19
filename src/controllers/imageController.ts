import db from "../db";
import {Request, Response} from "express";
import fs from "fs";

export const getAllImages = async (req: Request, res: Response) => {
    const allImages = await db.image.findMany();
    return res.json(allImages);
}

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
    const imageName = req.params.imageName
    const readStream = fs.createReadStream(`images/${imageName}`)
    readStream.pipe(res);

    return res.json(readStream);
}