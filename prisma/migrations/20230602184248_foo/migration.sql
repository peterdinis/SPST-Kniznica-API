/*
  Warnings:

  - You are about to drop the `_AuthorToImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AuthorToImage" DROP CONSTRAINT "_AuthorToImage_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorToImage" DROP CONSTRAINT "_AuthorToImage_B_fkey";

-- DropTable
DROP TABLE "_AuthorToImage";

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
