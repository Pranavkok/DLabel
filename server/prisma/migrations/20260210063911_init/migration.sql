-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "DataStatus" AS ENUM ('UNLABELED', 'PENDING_VERIFICATION', 'VERIFIED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('LABELING', 'VERIFICATION', 'WITHDRAWAL', 'DATASET_LOCK');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "labels_submitted" INTEGER NOT NULL DEFAULT 0,
    "labels_verified_correct" INTEGER NOT NULL DEFAULT 0,
    "labels_verified_incorrect" INTEGER NOT NULL DEFAULT 0,
    "verifications_done" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_active" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "dataset_name" VARCHAR(255) NOT NULL,
    "total_images" INTEGER NOT NULL,
    "amount_locked" DECIMAL(18,6) NOT NULL,
    "labeling_pool" DECIMAL(18,6) NOT NULL,
    "verification_pool" DECIMAL(18,6) NOT NULL,
    "amount_distributed" DECIMAL(18,6) NOT NULL DEFAULT 0,
    "labels" JSONB NOT NULL,
    "instructions" TEXT,
    "verification_required" BOOLEAN NOT NULL DEFAULT true,
    "status" "PostStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verification_deadline" TIMESTAMP(6),
    "completed_at" TIMESTAMP(6),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "status" "DataStatus" NOT NULL DEFAULT 'UNLABELED',
    "assigned_label" VARCHAR(255),
    "labeled_by" TEXT,
    "labeled_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verifications" (
    "id" TEXT NOT NULL,
    "data_id" TEXT NOT NULL,
    "verifier_id" TEXT NOT NULL,
    "verified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "company_id" TEXT,
    "post_id" TEXT,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(18,6) NOT NULL,
    "transaction_hash" VARCHAR(66),
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "metadata" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMP(6),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_reputation_idx" ON "users"("reputation" DESC);

-- CreateIndex
CREATE INDEX "posts_company_id_idx" ON "posts"("company_id");

-- CreateIndex
CREATE INDEX "posts_status_idx" ON "posts"("status");

-- CreateIndex
CREATE INDEX "data_post_id_idx" ON "data"("post_id");

-- CreateIndex
CREATE INDEX "data_status_idx" ON "data"("status");

-- CreateIndex
CREATE INDEX "data_labeled_by_idx" ON "data"("labeled_by");

-- CreateIndex
CREATE INDEX "verifications_data_id_idx" ON "verifications"("data_id");

-- CreateIndex
CREATE INDEX "verifications_verifier_id_idx" ON "verifications"("verifier_id");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_data_id_verifier_id_key" ON "verifications"("data_id", "verifier_id");

-- CreateIndex
CREATE INDEX "transactions_user_id_idx" ON "transactions"("user_id");

-- CreateIndex
CREATE INDEX "transactions_company_id_idx" ON "transactions"("company_id");

-- CreateIndex
CREATE INDEX "transactions_post_id_idx" ON "transactions"("post_id");

-- CreateIndex
CREATE INDEX "transactions_type_idx" ON "transactions"("type");

-- CreateIndex
CREATE INDEX "transactions_transaction_hash_idx" ON "transactions"("transaction_hash");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_labeled_by_fkey" FOREIGN KEY ("labeled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_data_id_fkey" FOREIGN KEY ("data_id") REFERENCES "data"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_verifier_id_fkey" FOREIGN KEY ("verifier_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
