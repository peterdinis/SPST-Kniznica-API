/*
  Warnings:

  - You are about to drop the column `image` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `imageTitle` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `isDeactivated` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `imageTitle` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `isDeactivated` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "image",
DROP COLUMN "imageTitle",
DROP COLUMN "isDeactivated";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "image",
DROP COLUMN "imageTitle",
DROP COLUMN "isDeactivated";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isTeacher" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
