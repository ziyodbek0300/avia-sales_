/*
  Warnings:

  - You are about to drop the column `hotelOrderId` on the `VisaPassenger` table. All the data in the column will be lost.
  - Added the required column `visaId` to the `VisaPassenger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VisaPassenger" DROP CONSTRAINT "VisaPassenger_hotelOrderId_fkey";

-- AlterTable
ALTER TABLE "VisaPassenger" DROP COLUMN "hotelOrderId",
ADD COLUMN     "visaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "VisaPassenger" ADD CONSTRAINT "VisaPassenger_visaId_fkey" FOREIGN KEY ("visaId") REFERENCES "HotelOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
