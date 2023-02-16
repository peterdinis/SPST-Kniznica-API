import { Request, Response } from "express";
import db from "../helpers/db";
import { getErrorMessage } from "../helpers/catchErrorMessage";
import { createCategoryType } from "../schemas/categorySchema";

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

export const categoryPagination = async (req: Request, res: Response) => {
  try {
    const limitValue = req.query.limit ||2;
    const skipValue = req.query.skip || 0;

    const allCategories = await db.category.findMany({
      take: limitValue as unknown as number,
      skip: skipValue as unknown as number
    })

    return res.json(allCategories);
  } catch (err) {
    getErrorMessage(err);
  }
}

export const createCategoryFn = async (req: Request<{}, {}, createCategoryType>, res: Response) => {
  const newCategory = await db.category.create({
    data: {
      ...req.body,
    },
  });

  return res.json(newCategory);
};
