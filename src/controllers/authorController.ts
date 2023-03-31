import db from "../db";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import paginator from "prisma-paginate";
import { createAuthorType } from "../schemas/authorSchema";
import { number, unknown } from "zod";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const getAllAuthors = async (req: Request, res: Response) => {
  const allAuthors = await db.author.findMany();
  return res.json(allAuthors);
};

export const findAllPaginatedAuthors = async (req: Request, res: Response) => {
  const allPaginatedAuthors = await paginate.author.paginate({
    page: Number(req.query.page) as unknown as number,
    limit: Number(req.query.limit) as unknown as number,
  });
  return res.json(allPaginatedAuthors);
};

export const getOneAuthor = async (req: Request, res: Response) => {
  const {id} = req.params;
  const oneAuthor = await db.author.findUnique({
    where: {
      id: Number(id),
    },
  })

  if(!oneAuthor) {
    throw new Error("No author found");
  }

  return res.json(oneAuthor);
}


export const createAuthor = async (req: Request<{}, {}, createAuthorType>, res: Response) => {
  const createNewAuthor = await db.author.create({
    data: {
      ...req.body
    }
  })

  return res.json(createNewAuthor);
}
