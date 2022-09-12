-- CreateTable
CREATE TABLE "Hotels" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "regionId" INTEGER NOT NULL,
    "jsonValue" JSONB NOT NULL,

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("id")
);
