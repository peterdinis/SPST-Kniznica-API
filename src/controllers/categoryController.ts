import { Request, Response } from "express";
import validate from "../schemas/validateSchema";
import { createCategorySchema } from "../schemas/categorySchema";
import db from "../helpers/db";

export const displayAllCategoriesFn = async (req: Request, res: Response) => {
  const allCategories = await db.category.findMany();
  return res.json(allCategories);
};

export const categoryDetailsFn = async (req: Request, res: Response) => {
  const { id } = req.params;

  const oneCategoy = await db.category.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!oneCategoy) {
    throw new Error("Category does not exists");
  }

  return oneCategoy;
};

export const createCategoryFn = async (req: Request, res: Response) => {
  validate(createCategorySchema);
  const newCategory = await db.category.create({
    data: {
      ...req.body,
    },
  });

  return res.json(newCategory);
};
