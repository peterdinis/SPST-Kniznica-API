import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

db.$use(async (params, next) => {
  if (params.model === "Book" && params.action === "update") {
    params.args.data.updatedAt = new Date();
  }

  if (params.model === "Category" && params.action === "update") {
    params.args.data.updatedAt = new Date();
  }

  if (params.model === "Student" && params.action === "update") {
    params.args.data.updatedAt = new Date();
  }

  if (params.model === "Teacher" && params.action === "update") {
    params.args.data.updatedAt = new Date();
  }

  if (params.model === "Admin" && params.action === "update") {
    params.args.data.updatedAt = new Date();
  }

  if (params.model === "Booking" && params.action === "update") {
    params.args.data.updatedAt = new Date();
  }

  if (params.model === "Author" && params.action === "update") {
    params.args.data.updatedAt = new Date();
  }

  if (params.model === "Message" && params.action === "update") {
    params.args.data.updatedAt = new Date();
  }

  return next(params);
});

export default db;
