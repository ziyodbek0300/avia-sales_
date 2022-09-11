/*
  Warnings:

  - You are about to drop the column `hotelOrderId` on the `TransferPassenger` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TransferPassenger" DROP CONSTRAINT "TransferPassenger_hotelOrderId_fkey";

-- AlterTable
ALTER TABLE "TransferPassenger" DROP COLUMN "hotelOrderId",
ADD COLUMN     "transferId" INTEGER;

-- AddForeignKey
ALTER TABLE "TransferPassenger" ADD CONSTRAINT "TransferPassenger_transferId_fkey" FOREIGN KEY ("transferId") REFERENCES "Transfer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
