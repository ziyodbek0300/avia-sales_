-- DropForeignKey
ALTER TABLE "VisaPassenger" DROP CONSTRAINT "VisaPassenger_visaId_fkey";

-- AlterTable
ALTER TABLE "VisaPassenger" ALTER COLUMN "visaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "VisaPassenger" ADD CONSTRAINT "VisaPassenger_visaId_fkey" FOREIGN KEY ("visaId") REFERENCES "Visa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
