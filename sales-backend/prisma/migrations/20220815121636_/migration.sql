/*
  Warnings:

  - You are about to drop the column `modelName` on the `Region` table. All the data in the column will be lost.
  - Added the required column `name` to the `Region` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Region" DROP COLUMN "modelName",
ADD COLUMN     "name" TEXT NOT NULL;
