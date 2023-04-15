import { Request, Response } from "express";
import db from "../db";
import { createNotificationType } from "../validators/notificationSchema";

export const getAllNotifications = async (req: Request, res: Response) => {
  const allNotifications = await db.notification.findMany();
  return res.json(allNotifications);
};

export const notificationInfo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const notificationDetail = await db.notification.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!notificationDetail) {
    return res.status(404).json("Notification not found");
  }

  return res.json(notificationDetail);
};

export const createNotification = async (
  req: Request<{}, {}, createNotificationType>,
  res: Response
) => {
  const { text, content, username } = req.body;

  const createNewNotification = await db.notification.create({
    data: {
      text,
      content,
      username,
    },
  });

  return res.json(createNewNotification);
};
