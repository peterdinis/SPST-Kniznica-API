import { Request, Response } from "express";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import db from "../helpers/db";
import bcrypt from "bcryptjs";
import { uuid } from "uuidv4";
import { addRefreshTokenToWhiteList, generateTokens } from "../helpers/jwt";

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password, role } = req.body;

    if (!name || !lastName || !email || !password || !role) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const existingStudent = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingStudent) {
      res.status(400);
      throw new Error("Student already exists");
    }

    if (password.length < 5) {
      res.status(400);
      throw new Error("Password must be at least 5 characters");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tokId = uuid() as unknown as number;

    const newStudent = await db.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });

    const {accessToken, refreshToken} = generateTokens(newStudent, tokId);

    await addRefreshTokenToWhiteList(tokId, refreshToken, newStudent.id);

    return res.status(201).json({
        newStudent,
        accessToken,
        refreshToken
    });
  } catch (err) {
    getErrorMessage(err);
  }
};

export const loginStudent = (req: Request, res: Response) => {
  try {
  } catch (err) {
    getErrorMessage(err);
  }
};
