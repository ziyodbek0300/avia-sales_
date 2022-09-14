/*
  Warnings:

  - You are about to drop the column `from` on the `ExcursionTour` table. All the data in the column will be lost.
  - You are about to drop the column `isWithReturn` on the `ExcursionTour` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `ExcursionTour` table. All the data in the column will be lost.
  - Added the required column `contactName` to the `ExcursionTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_no` to the `ExcursionTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ExcursionTour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExcursionTour" DROP COLUMN "from",
DROP COLUMN "isWithReturn",
DROP COLUMN "to",
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "phone_no" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ExcursionTourPassenger" (
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
    "tourId" INTEGER,

    CONSTRAINT "ExcursionTourPassenger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExcursionTourPassenger" ADD CONSTRAINT "ExcursionTourPassenger_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "ExcursionTour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
