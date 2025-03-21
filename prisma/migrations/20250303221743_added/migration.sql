-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "isThumbnail" BOOLEAN NOT NULL DEFAULT false;

-- RenameForeignKey
ALTER TABLE "Image" RENAME CONSTRAINT "Image_bannerId_fkey" TO "BannerImages_bannerId_fkey";

-- RenameForeignKey
ALTER TABLE "Image" RENAME CONSTRAINT "Image_productId_fkey" TO "ProductImages_productId_fkey";
