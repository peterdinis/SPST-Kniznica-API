import { Request, Response } from "express";
import db from "../helpers/db";

export const getAllTeachers = async (req: Request, res: Response) => {
  const displayAllTeachers = await db.teacher.findMany();
  return res.json(displayAllTeachers);
};
