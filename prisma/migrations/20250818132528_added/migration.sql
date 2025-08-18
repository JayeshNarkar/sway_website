-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryInformationId" INTEGER;

-- CreateTable
CREATE TABLE "DeliveryInformation" (
    "id" SERIAL NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "carrier" TEXT NOT NULL DEFAULT 'India Post',
    "dispatchedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "DeliveryInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryInformationId_fkey" FOREIGN KEY ("deliveryInformationId") REFERENCES "DeliveryInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
