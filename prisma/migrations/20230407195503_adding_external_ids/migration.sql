-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "externalId" TEXT;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "externalId" TEXT;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "externalId" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "externalId" TEXT;
