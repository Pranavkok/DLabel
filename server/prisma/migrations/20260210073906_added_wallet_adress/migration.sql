/*
  Warnings:

  - A unique constraint covering the columns `[wallet_address]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallet_address]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet_address` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_address` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "wallet_address" VARCHAR(42) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "wallet_address" VARCHAR(42) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "companies_wallet_address_key" ON "companies"("wallet_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_address_key" ON "users"("wallet_address");
