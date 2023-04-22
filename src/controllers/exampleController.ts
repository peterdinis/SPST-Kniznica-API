import { Request, Response } from "express";
import uuid = require('uuid');

export const exampleFn = (req: Request, res: Response) => {
    return res.send("OK");
}

export const generateRandomId = (req: Request, res: Response) => {
    let uuidv4: string = uuid.v4();
    return res.json({
        customId: uuidv4
    })
}