import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validate from "../schemas/validateSchema";
import { createBookSchema } from "../schemas/bookSchema";

const prisma = new PrismaClient();

export const displayAllBooksFn = async (req: Request, res: Response) => {
  const allBooks = await prisma.book.findMany();
  return res.json(allBooks);
};

export const displayOneBookFn = async (req: Request, res: Response) => {
  const { id } = req.params;
  const oneBook = await prisma.book.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!oneBook) {
    throw new Error("Book not found");
  }

  return res.json(oneBook);
};

export const searchingForBookFn = async (req: Request, res: Response) => {
  const requestedBook = await prisma.book.findMany({
    where: {
      name: req.query.name as string
    }
  })

  return res.json(requestedBook);
}

export const createBookFn = async (req: Request, res: Response) => {
  validate(createBookSchema);
  const newBook = await prisma.book.create({
    data: {
      ...req.body,
    },
  });

  return res.json(newBook);
};

export const updateBookFn = async (req: Request, res: Response) => {
  const { id } = req.params;
  const oneBook = await prisma.book.update({
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
  const book = await prisma.book.delete({
    where: {
      id: Number(id),
    },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  return res.json(book);
};
