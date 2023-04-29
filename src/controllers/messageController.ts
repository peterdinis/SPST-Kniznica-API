import { Request, Response } from "express";
import db from "../db";
import paginator from "prisma-paginate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const getAllMessages = async (req: Request, res: Response) => {
  const allMessages = await db.message.findMany();
  return res.json(allMessages);
};

export const allPaginatedMessagesFn = async (req: Request, res: Response) => {
  const allPaginatedMessages = await paginate.message.paginate({
    page: Number(req.query.page) as unknown as number,
    limit: Number(req.query.limit) as unknown as number,
  });

  return res.json(allPaginatedMessages);
};

export const getMessageInfo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const findMessage = await db.message.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!findMessage) {
    return res.status(404).json("Message not found");
  }

  return res.json(findMessage);
};

export const getAllMyMessages = async (req: Request, res: Response) => {
  const { username } = req.params;

  const findAllMyMessages = await db.message.findMany({
    where: {
      username,
    },
  });

  if (!findAllMyMessages) {
    return res.status(404).json("No messages found");
  }

  return findAllMyMessages;
};

export const updateMessageFn = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateMessage = await db.message.update({
    where: {
      id: Number(id),
    },

    data: {
      ...req.body,
    },
  });

  if (!updateMessage) {
    throw new Error(`Message not found`);
  }

  return res.json(updateMessage);
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleteMessage = await db.message.delete({
    where: {
      id: Number(id),
    },
  });

  if (!deleteMessage) {
    return res.status(404).json("Message not found");
  }

  return res.json(deleteMessage);
};

export const deleteAllMessages = async (req: Request, res: Response) => {
  const removeAllMessages = await db.message.deleteMany();
  return res.json(removeAllMessages);
};

export const deleteAllMyMessages = async (req: Request, res: Response) => {
  const { username } = req.params;
  const findAllMyMessages = await db.message.findMany({
    where: {
      username,
    },
  });

  if (!findAllMyMessages) {
    return res.status(404).json("No messages found");
  }

  const deleteAllMessages = await db.message.deleteMany({
    where: {
      username,
    },
  });

  return res.json(deleteAllMessages);
};
