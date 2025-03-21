/*
  Warnings:

  - You are about to drop the column `Category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Category",
DROP COLUMN "size";
