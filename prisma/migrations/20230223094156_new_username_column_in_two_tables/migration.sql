/*
  Warnings:

  - You are about to drop the column `lastName` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_name_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "lastName",
DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'USERNAME';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'USERNAME';

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
