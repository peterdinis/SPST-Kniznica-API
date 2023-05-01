/*
  Warnings:

  - You are about to drop the `UploadedFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UploadedFile";

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL DEFAULT '1000',
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);
