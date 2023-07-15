import { Request, Response } from "express";
import db from "../db";
import {
  createStudentLoginType,
  createStudentRegisterType,
} from "../validators/studentSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import paginator from "prisma-paginate";
import { PrismaClient } from "@prisma/client";
import { io} from '../server'


const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const getAllStudents = async (req: Request, res: Response) => {
  const displayAllStudents = await db.student.findMany();
  return res.json(displayAllStudents);
};

export const findAllPaginatedStudents = async (req: Request, res: Response) => {
  try {
    const allPaginatedStudents = await paginate.student.paginate({
      page: Number(req.query.page) as unknown as number,
      limit: Number(req.query.limit) as unknown as number,
    });
    return res.json(allPaginatedStudents);
  } catch (err) {
    getErrorMessage(err);
  }
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
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();

    const existingUser = await db.student.findFirst({
      where: {
        email,
        NOT: {
          isDeactivated: true,
        },
      },
    });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    if (password.length < 4) {
      return res.status(400).send("Password must be at least 4 characters");
    }

    const passwordHash = await bcrypt.hash(password, salt);

    const createNewStudent = await db.student.create({
      data: {
        ...req.body,
        password: passwordHash,
      },
    });

    const createNotification = await db.notification.create({
      data: {
        studentId: createNewStudent.id,
        message: "Registrácia bola úspešná",
      }
    })

    io.emit('newNotification', createNotification);


    return res.status(201).json(createNewStudent);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const studentLogin = async (
  req: Request<{}, {}, createStudentLoginType>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await db.student.findFirst({
      where: {
        email,
        NOT: {
          isDeactivated: true,
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Password does not match. " });

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

export const studentProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await db.student.findFirst({
      where: { id: Number(id) },
    });

    return res.status(200).json(user);
  } catch (err) {
    getErrorMessage(err);
  }
};
