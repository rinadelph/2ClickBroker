/*
  Warnings:

  - You are about to drop the column `location` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Listing` table. All the data in the column will be lost.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `isOfferingCommission` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "location",
DROP COLUMN "status",
ADD COLUMN     "amenities" TEXT,
ADD COLUMN     "bathrooms" DOUBLE PRECISION,
ADD COLUMN     "bedrooms" INTEGER,
ADD COLUMN     "buildingArea" DOUBLE PRECISION,
ADD COLUMN     "buildingAreaUnit" TEXT,
ADD COLUMN     "characteristics" TEXT[],
ADD COLUMN     "commissionType" TEXT,
ADD COLUMN     "commissionValue" DOUBLE PRECISION,
ADD COLUMN     "isOfferingCommission" BOOLEAN NOT NULL,
ADD COLUMN     "lotArea" DOUBLE PRECISION,
ADD COLUMN     "lotAreaUnit" TEXT,
ADD COLUMN     "parkingSpaces" INTEGER,
ADD COLUMN     "primaryType" TEXT,
ADD COLUMN     "specificType" TEXT,
ADD COLUMN     "yearBuilt" INTEGER;

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_token_key" ON "AccessToken"("token");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessToken" ADD CONSTRAINT "AccessToken_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessToken" ADD CONSTRAINT "AccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
