/*
  Warnings:

  - A unique constraint covering the columns `[userId,number]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_number_key" ON "Contact"("userId", "number");
