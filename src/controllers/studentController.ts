import { Request, Response } from "express";
import db from "../db";
import {
  createStudentLoginType,
  createStudentRegisterType,
} from "../validators/studentSchema";
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
    const { email, password, username } = req.body;
    const salt = await bcrypt.genSalt();

    const existingUser = await db.student.findFirst({
      where: {
        email
      }
    })

    if(existingUser) {
      return res.status(409).send("User already exists");
    }

    if(password.length < 4) {
      return res.status(400).send("Password must be at least 4 characters");
    }

    const passwordHash = await bcrypt.hash(password, salt);

    const createNewStudent = await db.student.create({
      data: {
        ...req.body,
        password: passwordHash,
      },
    });

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
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password does not match. " });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as unknown as string,
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

export const updateProfile = async (req: Request, res: Response) => {
  try { 
    const { username } = req.params;
    const user = await db.student.findFirst({
      where: {
        username
      }
    });

    const updateUser = await db.student.update({
      where:{
        id: user!.id
      },
      data: {
          ...req.body
      }
    })

    return updateUser;
  } catch (err) {
    getErrorMessage(err);
  }
}

export const deleteProfile = async (req: Request, res: Response) => {
   try {
    const { id } = req.params;
    const user = await db.student.findFirst({
      where: { id: Number(id) },
    });

    const deleteUser = await db.student.delete({
      where: {
        id: user!.id
      }
    })

    return res.status(200).json(deleteUser);
   } catch (err) {
    getErrorMessage(err);
   }
}