-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TEACHER', 'STUDENT', 'ADMIN');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "externalId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "publisher" TEXT NOT NULL DEFAULT 'Mladé Léta',
    "pages" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "categoryId" INTEGER NOT NULL DEFAULT 1,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "externalId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'FOO',
    "lastName" TEXT NOT NULL DEFAULT 'FOO',
    "username" TEXT NOT NULL DEFAULT 'FOO',
    "email" TEXT NOT NULL DEFAULT 'foo@gmail.com',
    "password" TEXT NOT NULL,
    "picture" BYTEA,
    "isLogged" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "classRoom" TEXT NOT NULL DEFAULT '1.A',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'FOO',
    "lastName" TEXT NOT NULL DEFAULT 'FOO',
    "username" TEXT NOT NULL DEFAULT 'FOO',
    "email" TEXT NOT NULL DEFAULT 'foo@gmail.com',
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'TEACHER',
    "isLogged" BOOLEAN NOT NULL DEFAULT false,
    "hasPermToCreate" BOOLEAN NOT NULL DEFAULT true,
    "hasPermToDelete" BOOLEAN NOT NULL DEFAULT true,
    "hasPermToUpdate" BOOLEAN NOT NULL DEFAULT true,
    "canSeeBooking" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'FOO',
    "lastName" TEXT NOT NULL DEFAULT 'FOO',
    "username" TEXT NOT NULL DEFAULT 'FOO',
    "email" TEXT NOT NULL DEFAULT 'foo@gmail.com',
    "password" TEXT NOT NULL,
    "hasPermToCreate" BOOLEAN NOT NULL DEFAULT true,
    "isLogged" BOOLEAN NOT NULL DEFAULT false,
    "specialCode" INTEGER NOT NULL DEFAULT 1000,
    "hasPermToDelete" BOOLEAN NOT NULL DEFAULT true,
    "hasPermToUpdate" BOOLEAN NOT NULL DEFAULT true,
    "canSeeBookings" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageTitle" TEXT,
    "image" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'Custom user',
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "externalId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "birthYear" INTEGER NOT NULL,
    "isAlive" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "litPeriod" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
