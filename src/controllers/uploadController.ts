import { Request, Response } from "express";
import db from "../db";


  export const getPhotoDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const imageInfo = await db.file.findFirst({
      where: {
        id: Number(id)
      },
    });
  
    if (!imageInfo) {
      return res.status(404).json("No image found");
    }
  
    return res.json(imageInfo);
  };

  export const uploadNewPhoto = async (req: any, res: Response) => {
    const { filename, path } = req.file;
  
    const savedFile = await db.file.create({
      data: {
        name: filename,
        path,
        externalId: String(Math.floor(100000 + Math.random() * 900000))
      },
    });
    
    return res.json(savedFile);
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