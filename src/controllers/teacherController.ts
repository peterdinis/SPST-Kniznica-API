import { Request, Response } from "express";
import db from "../helpers/db";
import {TEACHER } from "../constants/roles";
import bcrypt from "bcryptjs";
import {
  addRefreshTokenToWhiteList,
  generateTokens,
} from "../helpers/auth/jwt";
import { v4 } from "uuid";
import { getErrorMessage } from "../helpers/catchErrorMessage";

export const displayAllTeachers = async (req: Request, res: Response) => {
  const allTeachers = await db.user.findMany({
    where: {
      role: TEACHER,
    },
  });

  return res.status(200).json(allTeachers);
};

export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password, role } = req.body;

    const existingTeacher = await db.user.findFirst({
      where: {
        email,
        role: TEACHER,
      },
    });

    if (existingTeacher) {
      res.status(400);
      throw new Error(`Teacher with this credientials already exists`);
    }

    if (password.length < 5) {
      res.status(400);
      throw new Error("Password must be at least 5 characters");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tokId = v4() as unknown as number;

    const newTeacher = await db.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });

    const { accessToken, refreshToken } = generateTokens(newTeacher, tokId);

    await addRefreshTokenToWhiteList(tokId, refreshToken, newTeacher.id);

    return res.status(201).json({
      newTeacher,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    getErrorMessage(err);
  }
};

export const loginTeacher = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("You must provide an email and a password.");
  }

  const existingTeacher = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingTeacher) {
    res.status(403);
    throw new Error("Invalid login credentials.");
  }

  const validPassword = await bcrypt.compare(
    password,
    existingTeacher.password
  );
  if (!validPassword) {
    res.status(403);
    throw new Error("Invalid login credentials.");
  }

  const tokId = v4() as unknown as number;
  const { accessToken, refreshToken } = generateTokens(existingTeacher, tokId);
  await addRefreshTokenToWhiteList(tokId, refreshToken, existingTeacher.id);

  return res.status(201).json({
    existingTeacher,
    accessToken,
    refreshToken,
  });
};

export const teacherProfile = async (req: any, res: Response) => {
  try {
    const {userId} = req.payload;
    const teacher = await db.user.findUnique({
      where: {
        id: userId,
      }
    });

    if(!teacher) {
      res.status(404);
      throw new Error(`User not found`);
    }

    return res.status(200).json(teacher);
  } catch (err) {
    getErrorMessage(err);
  }
};