import { Request, Response } from "express";
import db from "../helpers/db";

export const getAllStudents = async (req: Request, res: Response) => {
    const displayAllStudents = await db.student.findMany();
    return res.json(displayAllStudents);
}

export const getStudentInfo = async (req: Request, res: Response) => {
    const {id} = req.params;
    const findOneStudent = await db.student.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!findOneStudent){
        return res.status(404).json("Student not found");
    }

    return findOneStudent;
}

export const studentRegister = async (req: Request, res: Response) => {
    return;
}

export const studentLogin = async (req: Request, res: Response) => {
    return;
}

export const studentProfile = async (req: Request, res: Response) => {
    return;
}