-- CreateTable
CREATE TABLE "TourPassenger" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastname" TEXT,
    "firtname" TEXT,
    "nationality" TEXT,
    "gender" "Gender",
    "birthday" TIMESTAMP(3),
    "passportNumber" TEXT,
    "endDate" TIMESTAMP(3),
    "tourPackId" INTEGER,

    CONSTRAINT "TourPassenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourPack" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "flightId" INTEGER,
    "hotelOrderId" INTEGER,
    "startDate" TIMESTAMP(3),
    "townId" TEXT,
    "hotelId" TEXT,
    "roomId" TEXT,
    "hotelPrice" DOUBLE PRECISION,
    "flightPrice" DOUBLE PRECISION,

    CONSTRAINT "TourPack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourPassenger" ADD CONSTRAINT "TourPassenger_tourPackId_fkey" FOREIGN KEY ("tourPackId") REFERENCES "TourPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
