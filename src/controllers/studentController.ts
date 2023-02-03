import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { uuid } from 'uuidv4';
import { getErrorMessage } from "../helpers/catchErrorMessage";

export const registerStudent = (req: Request, res: Response) => {
    try {

    } catch (err) {
        getErrorMessage(err);
    }
}

export const loginStudent = (req: Request, res: Response) => {
    try {

    } catch (err) {
        getErrorMessage(err);
    }
}