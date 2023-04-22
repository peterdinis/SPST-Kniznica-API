/*
  Warnings:

  - Added the required column `bookExternalId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookExternalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookExternalId_fkey" FOREIGN KEY ("bookExternalId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
