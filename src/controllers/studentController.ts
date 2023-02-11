import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import db from "../helpers/db";
import bcrypt from "bcryptjs";
import { addRefreshTokenToWhiteList, generateTokens } from "../helpers/jwt";
import { STUDENT} from "../constants/roles";
import { v4 } from "uuid";
import multer from "multer";

export const displayAllStudents = async (req: Request, res: Response) => {
  const allStudents = await db.user.findMany({
    where: {
      role: STUDENT
    }
  })

  return res.status(200).json(allStudents);
}

export const displayOneStudent = async (req: Request, res: Response) => {
  const {id} = req.params;

  const oneStudent = await db.user.findUnique({
    where: {
      id: Number(id) as any
    }
  })

  if(!oneStudent) {
    res.status(404);
    throw new Error("Student not found");
  }


  return oneStudent
}

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password, role, gender } = req.body;

    if (!name || !lastName || !email || !password || !role || !gender) {
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

    const tokId = v4() as unknown as number;

    const newStudent = await db.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });

    const { accessToken, refreshToken } = generateTokens(newStudent, tokId);

    await addRefreshTokenToWhiteList(tokId, refreshToken, newStudent.id);

    return res.status(201).json({
      newStudent,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    getErrorMessage(err);
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const tokId = v4() as unknown as number;
    const { accessToken, refreshToken } = generateTokens(existingUser, tokId);
    await addRefreshTokenToWhiteList(tokId, refreshToken, existingUser.id);

    return res.status(201).json({
        existingUser,
        accessToken,
        refreshToken
    })

  } catch (err) {
    getErrorMessage(err);
  }
};

export const profileFn = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {userId} = req.payload;
      const user = await db.user.findUnique({
        where: {
          id: userId,
        }
      });

      if(!user) {
        res.status(404);
        throw new Error(`User not found`);
      }

      return res.status(200).json(user);
    } catch (err) {
      getErrorMessage(err);
    }
}

export const studentProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
   const existingStudent = await db.user.findUnique({
      where: {
        id: req.params.id,
      }
   })

   if(!existingStudent) {
      res.status(404);
      throw new Error(`Student not found`);
   }

   const url = req.protocol + '://' + req.get('host');

   
}