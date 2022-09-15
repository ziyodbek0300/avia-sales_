-- CreateTable
CREATE TABLE "TourPackPassenger" (
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
    "tourPackId" INTEGER,

    CONSTRAINT "TourPackPassenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourPacketOrder" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hotelPrice" DOUBLE PRECISION NOT NULL,
    "transferPrice" DOUBLE PRECISION NOT NULL,
    "flightId" INTEGER,
    "partnerId" INTEGER,
    "passagersId" INTEGER[],
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "hotelId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "serviceId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "regionId" TEXT NOT NULL,

    CONSTRAINT "TourPacketOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourPackPassenger" ADD CONSTRAINT "TourPackPassenger_tourPackId_fkey" FOREIGN KEY ("tourPackId") REFERENCES "TourPacketOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourPacketOrder" ADD CONSTRAINT "TourPacketOrder_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE CASCADE ON UPDATE CASCADE;
