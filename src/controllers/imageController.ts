import { Request, Response } from "express";
import multer from "multer";
import db from "../db";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

interface UploadedFile {
  originalname: string;
  mimetype: string;
  filename: string;
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

  const file = req.file as UploadedFile;
  const { originalname, mimetype, filename } = file;

  const image = await db.image.create({
    data: {
      originalname,
      filename: `/uploads/${filename}`,
      mimetype,
    },
  });

  const addNewImage = await db.student.update({
    where: {
      id: findStudent.id
    },

    data: {
      picture: image.filename
    }
  })

  return res.json({
    image,
    addNewImage
  })
};
