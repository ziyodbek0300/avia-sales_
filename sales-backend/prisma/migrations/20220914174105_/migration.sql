/*
  Warnings:

  - Made the column `visaId` on table `VisaPassenger` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "VisaPassenger" DROP CONSTRAINT "VisaPassenger_visaId_fkey";

-- AlterTable
ALTER TABLE "VisaPassenger" ALTER COLUMN "visaId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "VisaPassenger" ADD CONSTRAINT "VisaPassenger_visaId_fkey" FOREIGN KEY ("visaId") REFERENCES "Visa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
