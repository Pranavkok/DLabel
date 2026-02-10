/*
  Warnings:

  - You are about to drop the column `value` on the `data` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `companies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "data" DROP COLUMN "value",
ADD COLUMN     "token_value" DECIMAL(18,6) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");
