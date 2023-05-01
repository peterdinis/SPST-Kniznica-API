/*
  Warnings:

  - Added the required column `imageId` to the `UploadedFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UploadedFile" ADD COLUMN     "imageId" INTEGER NOT NULL;
