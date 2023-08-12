-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_categoryId_fkey";

-- AlterTable
CREATE SEQUENCE category_externalid_seq;
ALTER TABLE "Category" ALTER COLUMN "externalId" SET DEFAULT nextval('category_externalid_seq');
ALTER SEQUENCE category_externalid_seq OWNED BY "Category"."externalId";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
