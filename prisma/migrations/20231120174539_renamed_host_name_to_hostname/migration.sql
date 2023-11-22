/*
  Warnings:

  - You are about to drop the column `hostName` on the `Stats` table. All the data in the column will be lost.
  - Added the required column `hostname` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "hostName",
ADD COLUMN     "hostname" TEXT NOT NULL;
