/*
  Warnings:

  - The `externalId` column on the `Author` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `externalId` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `externalId` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "externalId",
ADD COLUMN     "externalId" INTEGER NOT NULL DEFAULT 2020202;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "externalId",
ADD COLUMN     "externalId" INTEGER NOT NULL DEFAULT 1000;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "externalId",
ADD COLUMN     "externalId" INTEGER NOT NULL DEFAULT 2000;
