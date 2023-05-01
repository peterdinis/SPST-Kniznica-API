-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL DEFAULT 1000,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "publisher" TEXT NOT NULL DEFAULT 'Mlade Léta',
    "pages" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "categoryId" INTEGER NOT NULL DEFAULT 1,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL DEFAULT 2000,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'FOO',
    "lastName" TEXT NOT NULL DEFAULT 'FOO',
    "username" TEXT NOT NULL DEFAULT 'FOO',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "classRoom" TEXT NOT NULL DEFAULT '1.A',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'FOO',
    "lastName" TEXT NOT NULL DEFAULT 'FOO',
    "username" TEXT NOT NULL DEFAULT 'FOO',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'TEACHER',
    "hasPermToCreate" BOOLEAN NOT NULL DEFAULT true,
    "hasPermToDelete" BOOLEAN NOT NULL DEFAULT true,
    "hasPermToUpdate" BOOLEAN NOT NULL DEFAULT true,
    "canSeeBooking" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'FOO',
    "lastName" TEXT NOT NULL DEFAULT 'FOO',
    "username" TEXT NOT NULL DEFAULT 'FOO',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hasPermToCreate" BOOLEAN NOT NULL DEFAULT true,
    "specialCode" INTEGER NOT NULL DEFAULT 1000,
    "hasPermToDelete" BOOLEAN NOT NULL DEFAULT true,
    "hasPermToUpdate" BOOLEAN NOT NULL DEFAULT true,
    "canSeeBookings" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'FOO',
    "bookExternalId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL DEFAULT 2020202,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "picture" TEXT,
    "birthYear" INTEGER NOT NULL,
    "deathYear" INTEGER,
    "country" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "litPeriod" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL DEFAULT '1000',
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookExternalId_fkey" FOREIGN KEY ("bookExternalId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
