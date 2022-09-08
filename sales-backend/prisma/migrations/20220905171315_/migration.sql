-- CreateTable
CREATE TABLE "ExcursionTour" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "isWithReturn" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExcursionTour_pkey" PRIMARY KEY ("id")
);
