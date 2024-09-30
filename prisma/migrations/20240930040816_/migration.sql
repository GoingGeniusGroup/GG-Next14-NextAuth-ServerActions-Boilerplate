/*
  Warnings:

  - The `discount` column on the `ProductVariant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "discount",
ADD COLUMN     "discount" DOUBLE PRECISION;
