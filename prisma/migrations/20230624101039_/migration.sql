/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `deathYear` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "deathYear",
ADD COLUMN     "isAlive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "updatedAt";
