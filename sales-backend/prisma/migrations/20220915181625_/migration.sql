/*
  Warnings:

  - You are about to drop the column `meadId` on the `HotelOrder` table. All the data in the column will be lost.
  - Added the required column `mealId` to the `HotelOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HotelOrder" DROP COLUMN "meadId",
ADD COLUMN     "mealId" TEXT NOT NULL;
