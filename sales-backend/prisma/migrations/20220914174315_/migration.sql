-- DropForeignKey
ALTER TABLE "VisaPassenger" DROP CONSTRAINT "VisaPassenger_visaId_fkey";

-- AddForeignKey
ALTER TABLE "VisaPassenger" ADD CONSTRAINT "VisaPassenger_visaId_fkey" FOREIGN KEY ("visaId") REFERENCES "Visa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
