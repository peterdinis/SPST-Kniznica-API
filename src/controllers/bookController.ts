import { Request, Response } from "express";
import db from "../db";
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
 
  console.log(oneBook);

  const findAuthor = await db.author.findUnique({
    where: {
      id: oneBook.authorId
    }
  })

  const findCategory = await db.category.findUnique({
    where: {
      id: oneBook.categoryId
    }
  })
  return res.json({
    book: oneBook,
    author: findAuthor,
    category: findCategory
  });
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
    status,
    pages,
    year,
    quantity,
    publisher,
    categoryId,
    authorId
  } = req.body;

  const newCategoryForBook = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const authorForBook = await db.book.findUnique({
    where: {
      id: authorId as unknown as number,
    }
  })

  if (!newCategoryForBook) {
    res.status(404);
    throw new Error("Category not found");
  }

  if(!authorForBook) {
    res.status(404);
    throw new Error("Author not found");
  }

  const newBook = await db.book.create({
    data: {
      name,
      description,
      image,
      status,
      pages,
      year,
      quantity,
      publisher,
      categoryId: newCategoryForBook.id,
      authorId: authorForBook.id,
    }
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
