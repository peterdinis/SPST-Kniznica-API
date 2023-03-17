import {Request, Response} from "express";
import db from "../db";

export const adminExample = (req: Request, res: Response) => {
    return res.send("Admin example route");
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

export const changePermissionToTeacher = (req: Request, res: Response) => {
    return;
}

export const removeTeacherPermission = (req: Request, res: Response) => {
    return;
}