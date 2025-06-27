/*
  Warnings:

  - Added the required column `totalPrice` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('pending', 'completed', 'delivered', 'cancelled', 'failed');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('upi', 'cod');

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'upi',
ADD COLUMN     "status" "PurchaseStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "totalPrice" INTEGER NOT NULL;
