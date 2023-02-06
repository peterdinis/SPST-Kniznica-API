-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
