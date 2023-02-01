import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import validate from "../schemas/validateSchema";
import { createCategorySchema } from "../schemas/categorySchema";

const prisma = new PrismaClient();

export const displayAllCategoriesFn = async (req: Request, res: Response) =>{
    const allCategories = await prisma.category.findMany();
    return res.json(allCategories);
}

export const createCategoryFn = async (req: Request, res: Response) => {
    validate(createCategorySchema);
    const newCategory = await prisma.category.create({
        data: {
            ...req.body
        }
    })

    return res.json(newCategory);
}