import { NextFunction } from "express";
import { createPaginator } from "prisma-pagination";

export const pagination = (req: any, next: NextFunction) => {
  req.paginate = createPaginator({ page: req.query.page, perPage: 20 });
  next();
};
