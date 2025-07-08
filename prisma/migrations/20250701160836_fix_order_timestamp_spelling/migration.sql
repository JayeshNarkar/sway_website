/*
  Warnings:

  - You are about to drop the column `orderdAt` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderdAt",
ADD COLUMN     "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
