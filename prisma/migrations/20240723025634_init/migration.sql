-- CreateTable
CREATE TABLE "Itinerary" (
    "id" SERIAL NOT NULL,
    "itinerary" TEXT NOT NULL,
    "requesterIp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);
