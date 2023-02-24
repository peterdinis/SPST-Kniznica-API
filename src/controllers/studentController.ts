import { Request, Response } from "express";
import db from "../helpers/db";

export const saveStudent = async (req: Request, res: Response) => {
    const newStudent = await db.student.create({
        data: {
           ...req.body
        }
    })

    return newStudent
}

export const studentInfo = async (req: Request, res: Response) => {
    const {email} = req.params;

    const findStudent = await db.student.findFirst({
        where: {
            email
        }
    })

    if(!findStudent) {
        res.status(404);
        throw new Error(`Student not found`);
    }

    return findStudent;
}

export const removeStudent = async (req: Request, res: Response) => {
    const {email} = req.params;

    const findStudent = await db.student.findFirst({
        where: {
            email
        }
    })

    if(!findStudent) {
        res.status(404);
        throw new Error(`Student not found`);
    }

    const removeStudent = await db.student.delete({
        where: {
            id: findStudent.id
        }
    })

    return removeStudent;
}