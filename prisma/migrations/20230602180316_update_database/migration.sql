/*
  Warnings:

  - You are about to drop the column `picture` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "picture",
ADD COLUMN     "pictureId" INTEGER;

-- CreateTable
CREATE TABLE "_AuthorToImage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToImage_AB_unique" ON "_AuthorToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToImage_B_index" ON "_AuthorToImage"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToImage" ADD CONSTRAINT "_AuthorToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToImage" ADD CONSTRAINT "_AuthorToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
