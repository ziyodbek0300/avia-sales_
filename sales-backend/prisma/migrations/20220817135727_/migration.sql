-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
