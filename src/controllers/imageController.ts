import db from "../db";
import { Request, Response } from "express";

export const getAllImages = async (req: Request, res: Response) => {
  const allImages = await db.image.findMany();
  return res.json(allImages);
};

export const getOneImage = async (req: Request, res: Response) => {
  return;
};

export const testUploadImage = async (req: Request, res: Response) => {
  try {
    // Save the image filename to your Prisma database
    const newImage = await db.image.create({
      data: {
        ...req.body,
      },
    });

    return res.json(newImage);
  } catch (error) {
    console.error("Error uploading image", error);
    res.sendStatus(500);
  }
};
