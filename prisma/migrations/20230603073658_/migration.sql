/*
  Warnings:

  - You are about to drop the column `imageData` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "imageData",
DROP COLUMN "imagePath",
ADD COLUMN     "image" BYTEA NOT NULL DEFAULT 'default_image_data';
