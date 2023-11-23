/*
  Warnings:

  - You are about to drop the column `cpuModel` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `Stats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "cpuModel",
DROP COLUMN "ip";
