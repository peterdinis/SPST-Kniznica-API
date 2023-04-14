import db from "../db";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import paginator from "prisma-paginate";
import { createAuthorType } from "../validators/authorSchema";

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

export const updateAuthor = async (req: Request, res: Response) => {
  return;
}

export const deleteAuthor = async (req: Request, res: Response) => {
  return;
}

export const searchAuthor = async(req: Request, res: Response) => {
  const authors = await db.author.findMany({
     where: {
      name: {
        contains: String(req.query.q),
      }
     }
  });

  if(!authors) {
    res.status(404);
    throw new Error("Authors not found");
  }

  return res.json(authors);
}