import { Request, Response } from "express";
import db from "../helpers/db";

export const displayAllTeacher = async (req: Request, res: Response) => {
    const displayAllTeachers = await db.teacher.findMany();
    return res.json(displayAllTeachers);
}


export const saveTeacher = async (req: Request, res: Response) => {
    const newTeacher = await db.teacher.create({
        data: {
           ...req.body
        }
    })

    return res.json(newTeacher);
}

export const removeTeacher = async (req: Request, res: Response) => {
    const findTeacher = await db.teacher.findFirst({
        where: {
            email: String(req.query.email)
        }
    })

    if(!findTeacher) {
        res.status(404);
        throw new Error(`Teacher not found`);
    }

    const removeTeacher = await db.teacher.delete({
        where: {
            id: findTeacher.id
        }
    })

    return res.json(removeTeacher);
}