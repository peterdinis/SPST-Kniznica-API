import {Request, Response} from "express";
import db from "../helpers/db";

export const adminExample = (req: Request, res: Response) => {
    return res.send("Admin example route");
}

export const changePermissionToTeacher = (req: Request, res: Response) => {
    return;
}

export const removeTeacherPermission = (req: Request, res: Response) => {
    return;
}