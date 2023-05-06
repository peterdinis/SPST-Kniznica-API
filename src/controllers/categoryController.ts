import { Request, Response } from "express";
import db from "../db";
import { createCategoryType } from "../validators/categorySchema";
import paginator from "prisma-paginate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const paginate = paginator(prisma);

export const displayAllCategoriesFn = async (req: Request, res: Response) => {
  const allCategories = await db.category.findMany({
    include: {
      Books: true,
    },
  });
  return res.json(allCategories);
};

export const findAllPaginatedCategoriesFn = async (req: Request, res: Response) => {
  const allPaginatedCategories = await paginate.category.paginate({
    page: Number(req.query.page) as unknown as number,
    limit: Number(req.query.limit) as unknown as number,
  });
  return res.json(allPaginatedCategories);
}

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