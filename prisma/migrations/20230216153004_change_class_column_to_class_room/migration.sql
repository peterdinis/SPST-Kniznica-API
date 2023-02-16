/*
  Warnings:

  - You are about to drop the column `class` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "class",
ADD COLUMN     "classRoom" TEXT DEFAULT '1.A';
