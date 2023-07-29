/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "image" TEXT,
ADD COLUMN     "imageTitle" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "image" TEXT,
ADD COLUMN     "imageTitle" TEXT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "image" TEXT,
ADD COLUMN     "imageTitle" TEXT;

-- DropTable
DROP TABLE "Image";
