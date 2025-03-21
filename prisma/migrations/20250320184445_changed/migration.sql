/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId,identifier]` on the table `View` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "View_productId_idx";

-- DropIndex
DROP INDEX "View_userId_idx";

-- AlterTable
ALTER TABLE "View" ADD COLUMN     "identifier" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "View_productId_userId_identifier_key" ON "View"("productId", "userId", "identifier");
