import { Request, Response } from "express";
import db from "../db";
import { createCategoryType } from "../validators/categorySchema";
import paginator from "prisma-paginate";
import { PrismaClient } from "@prisma/client";
import { getErrorMessage } from "../helpers/catchErrorMessage";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const displayAllCategoriesFn = async (req: Request, res: Response) => {
  try {
    const allCategories = await db.category.findMany({
      include: {
        books: true,
      },
    });
    return res.json(allCategories);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const findAllPaginatedCategoriesFn = async (
  req: Request,
  res: Response
) => {
  try {
    const allPaginatedCategories = await paginate.category.paginate({
      page: Number(req.query.page) as unknown as number,
      limit: Number(req.query.limit) as unknown as number,
    });
    return res.json(allPaginatedCategories);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const categoryDetailsFn = async (req: Request, res: Response) => {
  try {
    const { externalId } = req.params;

    const oneCategoy = await db.category.findFirst({
      where: {
        externalId: Number(externalId),
      },
      include: {
        books: true,
      },
    });

    if (!oneCategoy) {
      return res.status(404).json("Category not found");
    }

    return res.json(oneCategoy);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const searchForCategory = async (req: Request, res: Response) => {
  try {
    const category = await db.category.findMany({
      where: {
        name: {
          contains: String(req.query.q),
        },
      },
    });

    if (!category) {
      return res.status(404).json("Categories not found");
    }

    return res.json(category);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const createCategoryFn = async (
  req: Request<{}, {}, createCategoryType>,
  res: Response
) => {
  try {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json("All fields must be defined");
    }

    const newCategory = await db.category.create({
      data: {
        ...req.body,
      },
    });

    return res.json(newCategory);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryForUpdate = await db.category.update({
      where: {
        id: Number(id),
      },

      data: {
        ...req.body,
      },
    });

    if (!categoryForUpdate) {
      return res.status(404).json("Category not found");
    }

    return res.json(categoryForUpdate);
  } catch (err) {
    getErrorMessage(err);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryForDelete = await db.category.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json(categoryForDelete);
  } catch (err) {
    getErrorMessage(err);
  }
};
