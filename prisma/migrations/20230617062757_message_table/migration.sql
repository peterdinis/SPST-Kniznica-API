-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
