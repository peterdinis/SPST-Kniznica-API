-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
