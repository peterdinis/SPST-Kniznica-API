import { Request, Response } from "express";
import db from "../db";
import { createTeacherRegisterType, createTeacherLoginType } from "../validators/teacherSchema";
import bcrypt from "bcrypt";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import jwt from "jsonwebtoken";

export const getAllTeachers = async (req: Request, res: Response) => {
  const displayAllTeachers = await db.teacher.findMany();
  return res.json(displayAllTeachers);
};


export const getTeacherInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const findOneTeacher = await db.teacher.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!findOneTeacher) {
    return res.status(404).json("Teacher not found");
  }

  return res.json(findOneTeacher);
};


export const teacherRegister = async (
  req: Request<{}, {}, createTeacherRegisterType>,
  res: Response
) => {
  try {
    const { password, username} = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const createNewTeacher = await db.teacher.create({
      data: {
        ...req.body,
        password: passwordHash
      } as any
    });

    return res.json(createNewTeacher);
  } catch (err) {
    getErrorMessage(err);
  }
};


export const teacherLogin = async (
  req: Request<{}, {}, createTeacherLoginType>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await db.teacher.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as unknown as string
    );

    return res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    getErrorMessage(err);
  }
};

export const teacherProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await db.teacher.findFirst({
      where: { id: Number(id) },
    });

    return res.status(200).json(user);
  } catch (err) {
    getErrorMessage(err);
  }
};