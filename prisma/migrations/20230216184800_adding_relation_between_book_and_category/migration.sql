-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "categoryId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
