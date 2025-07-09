-- CreateTable
CREATE TABLE "WebsiteLaunch" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "launchAt" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT DEFAULT 'Asia/Kolkata',

    CONSTRAINT "WebsiteLaunch_pkey" PRIMARY KEY ("id")
);
