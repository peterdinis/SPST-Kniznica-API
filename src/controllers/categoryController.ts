import { Request, Response } from "express";
import db from "../db";
import { createCategoryType } from "../schemas/categorySchema";

export const displayAllCategoriesFn = async (req: Request, res: Response) => {
  const allCategories = await db.category.findMany({
    include: {
      Books: true,
    },
  });
  return res.json(allCategories);
};

export const categoryDetailsFn = async (req: Request, res: Response) => {
  const { id } = req.params;

  const oneCategoy = await db.category.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      Books: true,
    },
  });

  if (!oneCategoy) {
    throw new Error("Category does not exists");
  }

  return res.json(oneCategoy);
};

export const createCategoryFn = async (
  req: Request<{}, {}, createCategoryType>,
  res: Response
) => {
  const newCategory = await db.category.create({
    data: {
      ...req.body,
    },
  });

  return res.json(newCategory);
};

export const searchCategory = async (req: Request, res: Response) => {
  const categories = await db.category.findMany({
    where: {
      name: {
        contains: String(req.query.q),
      },
    },
  });

  if (!categories) {
    res.status(404);
    throw new Error("Category not found");
  }

  return res.json(categories);
};
