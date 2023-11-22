-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "cpuModel" TEXT NOT NULL,
    "cpuCoreCount" INTEGER NOT NULL,
    "cpuUsage" DOUBLE PRECISION NOT NULL,
    "totalMemory" INTEGER NOT NULL,
    "usedMemory" INTEGER NOT NULL,
    "hostName" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "arch" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "uptime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);
