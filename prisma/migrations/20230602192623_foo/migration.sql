/*
  Warnings:

  - You are about to drop the column `pictureId` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_pictureId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "pictureId";

-- DropTable
DROP TABLE "Image";
