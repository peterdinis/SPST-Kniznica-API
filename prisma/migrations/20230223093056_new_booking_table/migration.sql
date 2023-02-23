-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookName" TEXT NOT NULL DEFAULT 'BookInfo';

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_name_fkey" FOREIGN KEY ("name") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
