/*
  Warnings:

  - You are about to drop the column `endDaye` on the `HotelOrder` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HotelOrder" DROP COLUMN "endDaye",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
