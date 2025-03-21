/*
  Warnings:

  - You are about to drop the column `isThumbnail` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "isThumbnail";

-- RenameForeignKey
ALTER TABLE "Image" RENAME CONSTRAINT "BannerImages_bannerId_fkey" TO "Image_bannerId_fkey";

-- RenameForeignKey
ALTER TABLE "Image" RENAME CONSTRAINT "ProductImages_productId_fkey" TO "Image_productId_fkey";
