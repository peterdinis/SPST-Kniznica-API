/*
  Warnings:

  - You are about to drop the column `bookName` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `bookId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_bookName_fkey";

-- DropIndex
DROP INDEX "Book_name_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookName",
ADD COLUMN     "bookId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
