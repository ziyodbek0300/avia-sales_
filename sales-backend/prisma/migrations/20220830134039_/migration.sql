/*
  Warnings:

  - You are about to drop the column `weekDays` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "weekDays" INTEGER[];

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "weekDays";

-- CreateTable
CREATE TABLE "HotelPassenger" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastname" TEXT NOT NULL,
    "firtname" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "hotelOrderId" INTEGER,

    CONSTRAINT "HotelPassenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransferPassenger" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastname" TEXT NOT NULL,
    "firtname" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "hotelOrderId" INTEGER,

    CONSTRAINT "TransferPassenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tarnsferFrom" TEXT NOT NULL,
    "tarnsferTo" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "passengers" INTEGER[],
    "price" DOUBLE PRECISION NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelOrder" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HotelPassenger" ADD CONSTRAINT "HotelPassenger_hotelOrderId_fkey" FOREIGN KEY ("hotelOrderId") REFERENCES "HotelOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransferPassenger" ADD CONSTRAINT "TransferPassenger_hotelOrderId_fkey" FOREIGN KEY ("hotelOrderId") REFERENCES "HotelOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
