/*
  Warnings:

  - You are about to drop the column `Category` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Category",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Other';
