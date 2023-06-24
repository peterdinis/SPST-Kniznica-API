import db from "../db";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import paginator from "prisma-paginate";
import { getErrorMessage } from "../helpers/catchErrorMessage";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const allAuthors = await db.author.findMany({
      include: {
        books: true,
      }, 
    });
    return res.json(allAuthors);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const findAllPaginatedAuthors = async (req: Request, res: Response) => {
  try {
    const allPaginatedAuthors = await paginate.author.paginate({
      page: Number(req.query.page) as unknown as number,
      limit: Number(req.query.limit) as unknown as number,
    });
    return res.json(allPaginatedAuthors);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const getOneAuthor = async (req: Request, res: Response) => {
  try {
    const { externalId } = req.params;
    const oneAuthor = await db.author.findFirst({
      where: {
        externalId: Number(externalId),
      },
    });

    if (!oneAuthor) {
      throw new Error("No author found");
    }

    return res.json(oneAuthor);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const searchForAuthor = async (req: Request, res: Response) => {
  try {
    const authors = await db.author.findMany({
      where: {
        name: {
          contains: String(req.query.q),
        },
      },
    });

    if (!authors) {
      return res.status(404).json("Authors not found");
    }

    return res.json(authors);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const createAuthor = async (
  req: Request,
  res: Response
) => {
  try {
    const createNewAuthor = await db.author.create({
      data: {
        externalId: Math.floor(100000 + Math.random() * 900000),
        ...req.body,
      },
    });

    return res.json(createNewAuthor);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authorForUpdate = await db.author.update({
      where: {
        id: Number(id),
      },

      data: {
        ...req.body,
      },
    });

    if (!authorForUpdate) {
      throw new Error("No author found");
    }

    return res.json(authorForUpdate);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const authorForDelete = await db.author.delete({
      where: {
        id: Number(id),
      },
    });

    if (!authorForDelete) {
      throw new Error("Author not found");
    }

    return res.json(authorForDelete);
  } catch (err) {
    getErrorMessage(err);
  }
};
