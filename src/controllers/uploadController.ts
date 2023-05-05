import { Request, Response } from "express";
import db from "../db";

  export const uploadNewPhoto = async (req: any, res: Response) => {
    const { filename, path } = req.file;
    const {username} = req.params;

    const findStudentByUsername = await db.student.findFirst({
      where: { username}
    })

    if(!findStudentByUsername) {
      return res.status(404).json("Student not found");
    }
  
    const savedFile = await db.file.create({
      data: {
        name: filename,
        path,
        externalId: String(Math.floor(100000 + Math.random() * 900000))
      },
    });
    
    
    await db.student.update({
      where: {
        id: findStudentByUsername.id
      },

      data: {
        picture: savedFile.path
      }
    });

    return res.json({
      message: "Nová fotka bola nahraná",
      photo: savedFile
    });
  };
  
  export const removeOneImage = async(req: Request, res: Response) =>{
    const { id } = req.params;
    const findOneImage = await db.file.findFirst({
      where: {
        id: Number(id)
      }
    })
  
    if(!findOneImage) {
      return res.status(404).json("Image not found");
    }
  
    const imageToDelete = await db.file.delete({
      where: {
        id: findOneImage.id
      }
    })
  
    return res.json(imageToDelete);
  }