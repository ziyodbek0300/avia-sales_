-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "orderId" INTEGER;

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
