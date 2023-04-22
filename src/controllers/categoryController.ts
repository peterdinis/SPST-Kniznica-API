import { Request, Response } from "express";
import db from "../db";
import { createCategoryType } from "../validators/categorySchema";

export const displayAllCategoriesFn = async (req: Request, res: Response) => {
  const allCategories = await db.category.findMany({
    include: {
      Books: true,
    },
  });
  return res.json(allCategories);
};

export const categoryDetailsFn = async (req: Request, res: Response) => {
  const { externalId } = req.params;

  const oneCategoy = await db.category.findFirst({
  where: {
      externalId: Number(externalId)
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


export const updateCategory = async (req: Request, res: Response) => {
  const {id} = req.params;
  const categoryForUpdate = await db.category.update({
    where: {
      id: Number(id),
    },

    data: {
      ...req.body
    }
  });

  if(!categoryForUpdate) {
    throw new Error("Category not found");
  }

  return res.json(categoryForUpdate);
}

export const deleteCategory = async (req: Request, res: Response) => {
  const {id} = req.params;
  const categoryForDelete = await db.category.delete({
    where: {
      id: Number(id),
    }
  })

  if(!categoryForDelete) {
    throw new Error("Category not found");
  }

  return res.json(categoryForDelete);
}