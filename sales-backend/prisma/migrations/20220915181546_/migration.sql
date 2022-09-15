/*
  Warnings:

  - Added the required column `endDaye` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HotelOrder" ADD COLUMN     "endDaye" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
