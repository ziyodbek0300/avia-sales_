-- DropForeignKey
ALTER TABLE "VisaPassenger" DROP CONSTRAINT "VisaPassenger_visaId_fkey";

-- AlterTable
ALTER TABLE "VisaPassenger" ALTER COLUMN "lastname" DROP NOT NULL,
ALTER COLUMN "firtname" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "passportNumber" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "visaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "VisaPassenger" ADD CONSTRAINT "VisaPassenger_visaId_fkey" FOREIGN KEY ("visaId") REFERENCES "Visa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
