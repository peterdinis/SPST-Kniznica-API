import db from "../db";
import { Request, Response } from "express";

export const getAllImages = async (req: Request, res: Response) => {
  const allImages = await db.image.findMany();
  return res.json(allImages);
};
