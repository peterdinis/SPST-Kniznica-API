import { Request, Response } from "express";
import db from "../db";
import {
  createTeacherRegisterType,
  createTeacherLoginType,
} from "../validators/teacherSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import paginator from "prisma-paginate";
import { PrismaClient } from "@prisma/client";
import { TEACHER } from "../constants/roles";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const getAllTeachers = async (req: Request, res: Response) => {
  const displayAllTeachers = await db.teacher.findMany();
  return res.json(displayAllTeachers);
};

export const findAllPaginatedTeacher = async (req: Request, res: Response) => {
  try {
    const allPaginatedTeachers = await paginate.teacher.paginate({
      page: Number(req.query.page) as unknown as number,
      limit: Number(req.query.limit) as unknown as number,
    });
    return res.json(allPaginatedTeachers);
  } catch (err) {
    return res.status(500).json(err);
  }
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
    const { password, role} = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if(role !== TEACHER) {
      return res.status(409).send("Role must be always teacher");
    }

    const createNewTeacher = await db.teacher.create({
      data: {
        ...req.body,
        password: passwordHash,
      },
    });

    return res.json(createNewTeacher);
  } catch (err) {
    return res.status(500).json(err);
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
    return res.status(500).json(err);
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
    return res.status(500).json(err);
  }
};