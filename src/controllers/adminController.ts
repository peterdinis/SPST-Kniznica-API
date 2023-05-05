import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import {
  createAdminRegisterType,
  createAdminLoginType,
} from "../validators/adminSchema";

export const adminExample = (req: Request, res: Response) => {
  return res.send("Admin example route");
};

export const registerAdmin = async (
  req: Request<{}, {}, createAdminRegisterType>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();

    const existingAdmin = await db.admin.findFirst({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      return res.status(409).send("Admin already exists");
    }

    if (password.length < 4) {
      return res.status(400).send("Password must be at least 4 characters");
    }

    const passwordHash = await bcrypt.hash(password, salt);

    const createNewAdmin = await db.admin.create({
      data: {
        ...req.body,
        password: passwordHash,
      },
    });

    return res.status(201).json(createNewAdmin);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const loginAdmin = async (
  req: Request<{}, {}, createAdminLoginType>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const admin = await db.admin.findFirst({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(400).json({ message: "Admin does not exist" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Password does not match. " });

    const token = jwt.sign(
      {
        id: admin.id,
      },
      process.env.JWT_SECRET as unknown as string
    );

    return res.status(201).json({
      admin,
      token,
    });
  } catch (err) {
    getErrorMessage(err);
  }
};

export const adminProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await db.admin.findFirst({
      where: { id: Number(id) },
    });

    return res.status(200).json(user);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const getAllPhotos = async (req: Request, res: Response) => {
  const allPhotosInApp = await db.file.findMany({});
  return res.json(allPhotosInApp);
};

export const getPhotoDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const imageInfo = await db.file.findFirst({
    where: {
      id: Number(id),
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
      externalId: String(Math.floor(100000 + Math.random() * 900000)),
    },
  });

  return res.json(savedFile);
};

export const deleteAllImages = async (req: Request, res: Response) => {
  const removeAllImages = await db.file.deleteMany({});
  return res.json(removeAllImages);
};
