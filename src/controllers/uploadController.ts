import axios from "axios";
import {Request, Response} from "express";

export const checkGoFileServerStatus = async(req: Request, res: Response) => {
    const serverStatus = await axios.get("https://api.gofile.io/getServer"); // TODO: Later add url to env
    const serverStatusResponse = serverStatus.data;
    return res.json(serverStatusResponse);
}

export const uploadFile = async() => {
    return;
}

export const deleteFile = async() => {
    return;
}

export const getFileInfo = async() => {
    return;
}