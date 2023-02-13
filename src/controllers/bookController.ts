import { Request, Response } from "express";
import validate from "../schemas/validateSchema";
import { createBookSchema } from "../schemas/bookSchema";
import db from "../helpers/db";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import { AVAIABLE } from "../constants/bookStatus";

export const displayAllBooksFn = async (req: Request, res: Response) => {
  const allBooks = await db.book.findMany();
  return res.json(allBooks);
};

export const findAllAvaiableBooks = async (req: Request, res: Response) => {
  const allAvaiableBooks = await db.book.findMany({
    where: {
      status: AVAIABLE
    },
  });

  if (allAvaiableBooks.length === 0) {
    return res.send("No avaiable books");
  }

  return res.json(allAvaiableBooks);
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

export const createBookFn = async (req: Request, res: Response) => {
  validate(createBookSchema);
  const newBook = await db.book.create({
    data: {
      ...req.body,
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
