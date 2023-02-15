/*
  Warnings:

  - You are about to drop the column `email` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `name` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_email_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "email",
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_name_fkey" FOREIGN KEY ("name") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
