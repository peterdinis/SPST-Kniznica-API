import { Request, Response } from "express";
import db from "../db";
import { createBookType } from "../validators/bookSchema";
import paginator from "prisma-paginate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const displayAllBooksFn = async (req: Request, res: Response) => {
  try {
    const allBooks = await db.book.findMany();
    return res.json(allBooks);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const findAllPaginatedBooks = async (req: Request, res: Response) => {
  try {
    const allPaginatedBooks = await paginate.book.paginate({
      page: Number(req.query.page) as unknown as number,
      limit: Number(req.query.limit) as unknown as number,
    });
    return res.json(allPaginatedBooks);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const displayOneBookFn = async (req: Request, res: Response) => {
  try {
    const { externalId } = req.params;
    const oneBook = await db.book.findFirst({
      where: {
        externalId: Number(externalId),
      },
    });

    if (!oneBook) {
      return res.status(404).json("Book not found");
    }

    const findAuthor = await db.author.findUnique({
      where: {
        id: oneBook.authorId,
      },
    });

    const findCategory = await db.category.findUnique({
      where: {
        id: oneBook.categoryId,
      },
    });
    return res.json({
      book: oneBook,
      author: findAuthor,
      category: findCategory,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const searchBook = async (req: Request, res: Response) => {
  try {
    const books = await db.book.findMany({
      where: {
        name: {
          contains: String(req.query.q),
        },
      },
    });

    if (!books) {
      return res.status(404).json("Books not found");
    }

    return res.json(books);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createBookFn = async (
  req: Request<{}, {}, createBookType>,
  res: Response
) => {
  try {
    const {
      name,
      description,
      image,
      status,
      pages,
      year,
      quantity,
      publisher,
      authorName, 
      categoryName,
    } = req.body;

    const newCategoryForBook = await db.category.findFirst({
      where: {
        name: categoryName,
      },
    });
    
    const authorForBook = await db.author.findFirst({
      where: {
        fullName: authorName, 
      },
    });

    if (!newCategoryForBook) {
      return res.status(409).json("Category not found");
    }

    if (!authorForBook) {
      return res.status(409).json("Author not found");
    }

    const newBook = await db.book.create({
      data: {
        name,
        externalId: Math.floor(100000 + Math.random() * 900000),
        description,
        image,
        status,
        pages,
        year,
        quantity,
        publisher,
        categoryId: newCategoryForBook.id,
        authorId: authorForBook.id,
      },
    });

    return res.json(newBook);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateBookFn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookForUpdate = await db.book.update({
      where: {
        id: Number(id),
      },

      data: {
        ...req.body,
      },
    });

    if (!bookForUpdate) {
      return res.status(404).json("Book not found");
    }

    return res.json(bookForUpdate);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteBookFn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await db.book.delete({
      where: {
        id: Number(id),
      },
    });

    if (!book) {
      return res.status(404).json("Book not found");
    }

    // Find all categories with books that have this id
    const categoriesWithBook = await db.category.findMany({
      where: {
        books: {
          some: {
            id: Number(id)
          }
        }
      }
    });

    // Find all authors with books that have this id
    const authorsWithBook = await db.author.findMany({
      where: {
        books: {
          some: {
            id: Number(id)
          }
        }
      }
    });

    // Remove the book from categories and authors
    await Promise.all([
      ...categoriesWithBook.map(category => db.category.update({
        where: { id: category.id },
        data: {
          books: {
            disconnect: {
              id: Number(id)
            }
          }
        }
      })),
      ...authorsWithBook.map(author => db.author.update({
        where: { id: author.id },
        data: {
          books: {
            disconnect: {
              id: Number(id)
            }
          }
        }
      }))
    ]);

    return res.json(book);
  } catch (err) {
    return res.status(500).json(err);
  }
};