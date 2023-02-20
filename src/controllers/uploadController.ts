import axios from "axios";
import {Request, Response} from "express";

export const checkGoFileServerStatus = async(req: Request, res: Response) => {
    const serverStatus = await axios.get(process.env.GOFILE_URL as string);
    const serverStatusResponse = serverStatus.data;
    return res.json(serverStatusResponse);
}

export const checkAccountInfo = async(req: Request, res: Response) => {
    return;
}