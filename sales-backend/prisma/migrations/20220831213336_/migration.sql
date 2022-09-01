-- DropForeignKey
ALTER TABLE "HotelPassenger" DROP CONSTRAINT "HotelPassenger_hotelOrderId_fkey";

-- DropForeignKey
ALTER TABLE "TransferPassenger" DROP CONSTRAINT "TransferPassenger_hotelOrderId_fkey";

-- AlterTable
ALTER TABLE "Region" ALTER COLUMN "regionId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "HotelPassenger" ADD CONSTRAINT "HotelPassenger_hotelOrderId_fkey" FOREIGN KEY ("hotelOrderId") REFERENCES "HotelOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferPassenger" ADD CONSTRAINT "TransferPassenger_hotelOrderId_fkey" FOREIGN KEY ("hotelOrderId") REFERENCES "HotelOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
