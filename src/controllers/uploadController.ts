import axios from "axios";
import {Request, Response} from "express";
import db from "../helpers/db";
import { STUDENT, TEACHER } from "../constants/roles";

export const checkGoFileServerStatus = async(req: Request, res: Response) => {
    const serverStatus = await axios.get(process.env.GOFILE_URL as string);
    const serverStatusResponse = serverStatus.data;
    return res.json(serverStatusResponse);
}

export const checkAccountInfo = async(req: Request, res: Response) => {
    const checkAccountInfo = await axios.get(`https://api.gofile.io/getAccountDetails?token=${process.env.GOFILE_API_TOKEN as string}`);
    const checkAccountInfoResponse = checkAccountInfo.data;
    return res.json(checkAccountInfoResponse);
}

export const uploadPictureForStudent = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {picture} = req.body; // file from gofile
    const findStudent = await db.user.findFirst({
        where: {
            id,
            role: STUDENT
        }
    })

    if(!findStudent) {
        res.status(404);
        throw new Error(`Student not found`);
    }

    const updatePicture =await db.user.update({
        where: {
            id
        },

        data: {
            profilePic: picture
        }
    })

    return res.status(201).json({
        message: "New picture was added",
        updatePicture
    })
}

export const uploadPictureForTeacher = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {picture} = req.body; // file from gofile
    const findTeacher = await db.user.findFirst({
        where: {
            id,
            role: TEACHER
        }
    })

    if(!findTeacher) {
        res.status(404);
        throw new Error(`Teacher not found`);
    }

    const updatePicture =await db.user.update({
        where: {
            id
        },

        data: {
            profilePic: picture
        }
    })

    return res.status(201).json({
        message: "New picture was added",
        updatePicture
    })
}