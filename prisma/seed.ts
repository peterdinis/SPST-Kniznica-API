import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const bookData: Prisma.BookCreateInput[] = [];
const categoryData: Prisma.CategoryCreateInput[] = [];
const exampleAdminUser = [];