-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'ACCEPT', 'CANCEL');

-- AlterTable
ALTER TABLE "ExcursionTour" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "HotelOrder" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "TourPack" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "TourPacketOrder" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "Visa" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';
