/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Banner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_bannerId_fkey";

-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "imageId" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Banner_imageId_key" ON "Banner"("imageId");

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
