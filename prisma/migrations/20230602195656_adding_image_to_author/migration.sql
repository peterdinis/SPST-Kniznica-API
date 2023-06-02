-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "imageData" BYTEA NOT NULL DEFAULT 'default_image_data',
ADD COLUMN     "imagePath" TEXT NOT NULL DEFAULT 'default_image_path';
