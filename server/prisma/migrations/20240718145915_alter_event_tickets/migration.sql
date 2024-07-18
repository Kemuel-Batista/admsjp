-- AlterTable
ALTER TABLE "events_tickets" ADD COLUMN     "delivered_at" TIMESTAMP(3),
ADD COLUMN     "delivered_by" TEXT,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" TEXT;
