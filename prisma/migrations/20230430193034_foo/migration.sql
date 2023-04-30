/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);
