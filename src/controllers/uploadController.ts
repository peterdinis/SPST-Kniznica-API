import axios from "axios";
import {Request, Response} from "express";

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

export const uploadPicture = async() => {
    return;
}