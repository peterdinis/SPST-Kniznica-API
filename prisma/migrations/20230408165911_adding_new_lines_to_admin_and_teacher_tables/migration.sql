-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "canSeeBookings" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "canSeeBooking" BOOLEAN NOT NULL DEFAULT false;
