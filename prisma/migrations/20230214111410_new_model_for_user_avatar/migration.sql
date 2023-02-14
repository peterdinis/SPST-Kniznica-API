/*
  Warnings:

  - You are about to drop the column `profilePic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePic";

-- CreateTable
CREATE TABLE "UserAvatar" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "UserAvatar_pkey" PRIMARY KEY ("id")
);
