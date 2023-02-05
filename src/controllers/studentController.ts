import {Request, Response} from "express";
import bcrypt from "bcrypt";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import db from "../helpers/db";
import hashToken from "../helpers/hashToken";

const addRefreshTokenToWhiteList = (tokId: string, refreshToken: string, userId: string) => {
    return db.refreshToken.create({
        data: {
            id: tokId,
            hashedToken: hashToken(refreshToken),
            userId
        }
    })
}

export const registerStudent = async (req: Request, res: Response) => {
        const {name, lastName, email, password, role} = req.body;

        if(!name || !lastName || !email || !password || !role) {
            res.status(400);
            throw new Error("All fields are required");
        }

        const existingStudent = await db.user.findUnique({
            where: {
                email
            }
        })

        if(existingStudent) {
            res.status(400);
            throw new Error("Student already exists");
        }

        if(password.length < 5) {
            res.status(400);
            throw new Error("Password must be at least 5 characters");
        }

        const hashedPassword = bcrypt.hash(password, 10) as unknown as string;

        const newStudent = await db.user.create({
            data: {
              name,
              lastName,
              email,
              password: hashedPassword,
              role,
            }
        })

        console.log(newStudent);

        /* const tokId = uuid() as unknown as number;
        const {accessToken, refreshToken} = generateTokens(newStudent, tokId);
        
        return res.status(201).json({
            student: newStudent,
            accessToken,
            refreshToken
        }) */
}

export const loginStudent = (req: Request, res: Response) => {
    try {

    } catch (err) {
        getErrorMessage(err);
    }
}