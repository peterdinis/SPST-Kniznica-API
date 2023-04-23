import { Response } from "express";

export const exampleFn = (res: Response) => {
    return res.send("OK");
}