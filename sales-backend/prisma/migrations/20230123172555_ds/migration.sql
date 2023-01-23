-- AlterTable
ALTER TABLE "ExcursionTour" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HotelOrder" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TourPacketOrder" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Visa" ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;
