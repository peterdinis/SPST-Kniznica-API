import {Request, Response} from "express";
import db from "../helpers/db";

export const adminExample = (req: Request, res: Response) => {
    return res.send("Admin example route");
}