-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
