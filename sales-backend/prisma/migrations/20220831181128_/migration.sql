/*
  Warnings:

  - The `regionId` column on the `Region` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Region" DROP COLUMN "regionId",
ADD COLUMN     "regionId" INTEGER[] DEFAULT ARRAY[102]::INTEGER[];
