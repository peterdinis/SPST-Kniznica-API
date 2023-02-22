import { Request, Response } from "express";
import db from "../helpers/db";
import { createBookType } from "../schemas/bookSchema";
import paginator from "prisma-paginate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const displayAllBooksFn = async (req: Request, res: Response) => {
  const allBooks = await db.book.findMany();
  return res.json(allBooks);
};

export const findAllPaginatedBooks = async (req: Request, res: Response) => {
  const allPaginatedBooks = await paginate.book.paginate({
    page: Number(req.query.page) as unknown as number,
    limit: Number(req.query.limit) as unknown as number,
  });
  return res.json(allPaginatedBooks);
};

export const displayOneBookFn = async (req: Request, res: Response) => {
  const { id } = req.params;
  const oneBook = await db.book.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!oneBook) {
    throw new Error("Book not found");
  }

  return res.json(oneBook);
};

export const searchBook = async (req: Request, res: Response) => {
  const books = await db.book.findMany({
    where: {
      name: {
        contains: String(req.query.q),
      },
    },
  });

  if (!books) {
    res.status(404);
    throw new Error("Book not found");
  }

  return res.json(books);
};

export const createBookFn = async (
  req: Request<{}, {}, createBookType>,
  res: Response
) => {
  const {
    name,
    description,
    image,
    author,
    status,
    pages,
    year,
    quantity,
    publisher,
    categoryId,
  } = req.body;

  const newCategoryForBook = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!newCategoryForBook) {
    res.status(404);
    throw new Error("Category not found");
  }

  const newBook = await db.book.create({
    data: {
      name,
      description,
      image,
      author,
      status,
      pages,
      year,
      quantity,
      publisher,
      categoryId: newCategoryForBook.id,
    },
  });

  return res.json(newBook);
};

export const updateBookFn = async (req: Request, res: Response) => {
  const { id } = req.params;
  const oneBook = await db.book.update({
    where: {
      id: Number(id),
    },

    data: {
      ...req.body,
    },
  });

  if (!oneBook) {
    throw new Error("Book not found");
  }

  return res.json(oneBook);
};

export const deleteBookFn = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await db.book.delete({
    where: {
      id: Number(id),
    },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  return res.json(book);
};
