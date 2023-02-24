import { Request, Response } from "express";
import db from "../helpers/db";

export const saveTeacher = async (req: Request, res: Response) => {
    const newTeacher = await db.teacher.create({
        data: {
           ...req.body
        }
    })

    return newTeacher
}

export const teacherInfo = async (req: Request, res: Response) => {
    const {email} = req.params;

    const findTeacher = await db.teacher.findFirst({
        where: {
            email
        }
    })

    if(!findTeacher) {
        res.status(404);
        throw new Error(`Teacher not found`);
    }

    return findTeacher;
}

export const removeTeacher = async (req: Request, res: Response) => {
    const {email} = req.params;

    const findTeacher = await db.teacher.findFirst({
        where: {
            email
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

    return removeTeacher;
}