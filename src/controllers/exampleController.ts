import { Request, Response } from "express";

export const exampleFn = (req: Request, res: Response) => {
    return res.send("OK");
}