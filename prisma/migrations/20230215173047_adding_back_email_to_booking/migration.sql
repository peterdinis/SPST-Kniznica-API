/*
  Warnings:

  - You are about to drop the column `userId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
