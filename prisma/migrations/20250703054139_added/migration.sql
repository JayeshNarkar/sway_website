-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentInformationId" INTEGER;

-- CreateTable
CREATE TABLE "PaymentInformation" (
    "id" SERIAL NOT NULL,
    "upiId" TEXT NOT NULL,
    "txnId" TEXT,

    CONSTRAINT "PaymentInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentInformationId_fkey" FOREIGN KEY ("paymentInformationId") REFERENCES "PaymentInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
