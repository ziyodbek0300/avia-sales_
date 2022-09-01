/*
  Warnings:

  - Added the required column `visaType` to the `Visa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visa" ADD COLUMN     "visaType" TEXT NOT NULL;
