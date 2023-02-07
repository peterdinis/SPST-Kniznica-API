import { Request, Response } from "express";
import db from "../helpers/db";
import { TEACHER } from "../constants/roles";

export const displayAllTeachers = async (req: Request, res: Response) => {
    const allTeachers = await db.user.findMany({
      where: {
        role: TEACHER
      }
    })
  
    return res.status(200).json(allTeachers);
}