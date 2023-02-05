import { Request, Response } from "express";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import db from "../helpers/db";
import bcrypt from "bcryptjs";

export const registerStudent = async (req: Request, res: Response) => {
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

  const newStudent = await db.user.create({
    data: {
      name,
      lastName,
      email,
      password: hashedPassword,
      role,
    },
  });

  return res.status(201).json(newStudent);
};

export const loginStudent = (req: Request, res: Response) => {
  try {
  } catch (err) {
    getErrorMessage(err);
  }
};
