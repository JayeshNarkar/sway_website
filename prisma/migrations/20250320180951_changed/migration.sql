/*
  Warnings:

  - You are about to drop the column `ip` on the `View` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "View_productId_userId_ip_key";

-- AlterTable
ALTER TABLE "View" DROP COLUMN "ip";

-- CreateIndex
CREATE INDEX "View_productId_idx" ON "View"("productId");

-- CreateIndex
CREATE INDEX "View_userId_idx" ON "View"("userId");
