import { Request, Response } from "express";
import db from "../db";

interface IFile {
  originalname: string;
  path: string;
}

export const uploadImageForStudent = async (req: Request, res: Response) => {
  const { username } = req.params;

  const findStudent = await db.student.findFirst({
    where: {
      username,
    },
  });

  if (!findStudent) {
    return res.status(404).json("Student not found");
  }

  const file = req.file as IFile;

  const savedFile = await db.image.create({
    data: {
      filename: file.originalname,
      path: file.path,
    },
  });

  console.log(savedFile);

  const addNewImage = await db.student.update({
    where: {
      id: findStudent.id
    },

    data: {
      picture: file.originalname
    }
  })

  return res.json({
    file,
    addNewImage
  })
};
