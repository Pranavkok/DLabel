-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tokens_claimed" DECIMAL(18,6) NOT NULL DEFAULT 0,
ADD COLUMN     "tokens_earned" DECIMAL(18,6) NOT NULL DEFAULT 0;
