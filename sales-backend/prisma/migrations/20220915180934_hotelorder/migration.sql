/*
  Warnings:

  - Added the required column `comment` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelId` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meadId` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExcursionTour" ADD COLUMN     "passagersId" INTEGER[];

-- AlterTable
ALTER TABLE "HotelOrder" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hotelId" TEXT NOT NULL,
ADD COLUMN     "meadId" TEXT NOT NULL,
ADD COLUMN     "partnerId" INTEGER,
ADD COLUMN     "passagersId" INTEGER[],
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "regionId" TEXT NOT NULL,
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "serviceId" TEXT;
