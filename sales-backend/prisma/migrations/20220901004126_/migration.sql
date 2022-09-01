-- CreateTable
CREATE TABLE "VisaPassenger" (
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
    "hotelOrderId" INTEGER,

    CONSTRAINT "VisaPassenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visa" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "passengers" INTEGER[],

    CONSTRAINT "Visa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisaPassenger" ADD CONSTRAINT "VisaPassenger_hotelOrderId_fkey" FOREIGN KEY ("hotelOrderId") REFERENCES "HotelOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
