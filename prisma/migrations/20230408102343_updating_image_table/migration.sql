/*
  Warnings:

  - You are about to drop the column `mimetype` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `originalname` on the `Image` table. All the data in the column will be lost.
  - Added the required column `path` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "mimetype",
DROP COLUMN "originalname",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
