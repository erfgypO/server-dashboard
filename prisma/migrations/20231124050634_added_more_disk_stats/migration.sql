/*
  Warnings:

  - You are about to alter the column `diskUsed` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "diskUsedPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "diskUsed" SET DEFAULT 0,
ALTER COLUMN "diskUsed" SET DATA TYPE INTEGER;
