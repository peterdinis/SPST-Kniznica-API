import { Request, Response } from "express";
import db from "../helpers/db";
import { createStudentRegisterType } from "../schemas/studentSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "../helpers/catchErrorMessage";

export const getAllStudents = async (req: Request, res: Response) => {
  const displayAllStudents = await db.student.findMany();
  return res.json(displayAllStudents);
};

export const getStudentInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const findOneStudent = await db.student.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!findOneStudent) {
    return res.status(404).json("Student not found");
  }

  return res.json(findOneStudent);
};

export const studentRegister = async (
  req: Request<{}, {}, createStudentRegisterType>,
  res: Response
) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const createNewStudent = await db.student.create({
      data: {
        ...req.body,
        password: passwordHash,
      },
    });

    return res.json(createNewStudent);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const studentLogin = async (req: Request, res: Response) => {
  return;
};

export const studentProfile = async (req: Request, res: Response) => {
  return;
};
