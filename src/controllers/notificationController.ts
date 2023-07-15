import { Request, Response } from "express";
import db from "../db";
import { getErrorMessage } from "../helpers/catchErrorMessage";

export const displayAllNotifications = async (req: Request, res: Response) => {
  try {
    const allNotifications = await db.notification.findMany();
    return res.json(allNotifications);
  } catch (err) {
    getErrorMessage(err);
  }
};


export const getMyNotification = async (req: Request, res: Response) => {
    try {
     const {username} = req.params;
     const myNotification = await db.notification.findMany({
        where: {username}
     })

     if(!myNotification) {
        return res.status(404).json("No notifications found");
     }

     return res.json(myNotification);
    } catch (err) {
        getErrorMessage(err);
      }
}