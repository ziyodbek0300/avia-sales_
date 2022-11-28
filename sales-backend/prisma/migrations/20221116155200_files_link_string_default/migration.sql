-- AlterTable
ALTER TABLE "ExcursionTourPassenger" ADD COLUMN     "filesLink" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "HotelPassenger" ADD COLUMN     "filesLink" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "filesLink" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "TourPackPassenger" ADD COLUMN     "filesLink" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "TourPassenger" ADD COLUMN     "filesLink" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "TransferPassenger" ADD COLUMN     "filesLink" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "VisaPassenger" ADD COLUMN     "filesLink" TEXT NOT NULL DEFAULT '';
