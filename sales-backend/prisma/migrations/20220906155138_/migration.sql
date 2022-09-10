/*
  Warnings:

  - You are about to alter the column `fromId` on the `Flight` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `toId` on the `Flight` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "regionId" INTEGER,
ALTER COLUMN "fromId" SET DATA TYPE INTEGER,
ALTER COLUMN "toId" SET DATA TYPE INTEGER;
