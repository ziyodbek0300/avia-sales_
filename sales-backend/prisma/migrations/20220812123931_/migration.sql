-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "chartRegular" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "bookingStatus" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "passengers" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
