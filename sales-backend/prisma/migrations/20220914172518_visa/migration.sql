/*
  Warnings:

  - Made the column `visaId` on table `VisaPassenger` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VisaPassenger" ALTER COLUMN "visaId" SET NOT NULL,
ALTER COLUMN "visaId" SET DEFAULT 1;
