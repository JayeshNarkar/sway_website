/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "thumbnailUrl",
ADD COLUMN     "Category" TEXT NOT NULL DEFAULT 'Other';
