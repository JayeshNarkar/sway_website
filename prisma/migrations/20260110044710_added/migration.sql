-- CreateTable
CREATE TABLE "CategoryInfo" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "info" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryInfo_categoryId_key" ON "CategoryInfo"("categoryId");

-- AddForeignKey
ALTER TABLE "CategoryInfo" ADD CONSTRAINT "CategoryInfo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
