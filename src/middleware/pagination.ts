import { createPaginator } from "prisma-pagination";

export const pagination = (req: any, next: any) => {
  req.paginate = createPaginator({ page: req.query.page, perPage: 20 });
  next();
};
