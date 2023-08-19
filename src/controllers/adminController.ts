import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createAdminRegisterType,
  createAdminLoginType,
} from "../validators/adminSchema";

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
    return res.status(500).json(err);
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
    return res.status(500).json(err);
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
    return res.status(500).json(err);
  }
};

export const deactivatedStudentProfile = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params; 
    const user = await db.student.findFirst({
      where: {
        id: Number(studentId)
      },
    });

    if(!user) {
      return res.status(409).json("Žiak neexistuje");
    }
    const deactivatedUser = await db.student.delete({
      where: {
        id: user!.id,
      },
    });

    return res.status(200).json(deactivatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deactivatedTeacherProfile = async (req: Request, res: Response) => {
  try {
    const { teacherId} = req.params;

    const user = await db.teacher.findFirst({
      where: {
        id: Number(teacherId)
      },
    });

    if(!user) {
      return res.status(409).json("Učiteľ neexistue");
    }

    const deactivatedUser = await db.teacher.delete({
      where: {
        id: user!.id,
      },
    });

    return res.status(200).json(deactivatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
