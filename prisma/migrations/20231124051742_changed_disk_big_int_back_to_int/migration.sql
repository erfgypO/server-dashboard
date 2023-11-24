/*
  Warnings:

  - You are about to alter the column `diskSize` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `diskUsed` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Stats" ALTER COLUMN "diskSize" SET DATA TYPE INTEGER,
ALTER COLUMN "diskUsed" SET DATA TYPE INTEGER;
