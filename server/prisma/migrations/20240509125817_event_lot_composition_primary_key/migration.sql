/*
  Warnings:

  - The primary key for the `events_lots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `events_lots` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `events_lots` table. All the data in the column will be lost.
  - You are about to drop the column `lot_id` on the `events_tickets` table. All the data in the column will be lost.
  - Added the required column `lot` to the `events_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events_tickets" DROP CONSTRAINT "events_tickets_lot_id_fkey";

-- DropIndex
DROP INDEX "events_lots_uuid_key";

-- AlterTable
ALTER TABLE "events_lots" DROP CONSTRAINT "events_lots_pkey",
DROP COLUMN "id",
DROP COLUMN "uuid",
ADD CONSTRAINT "events_lots_pkey" PRIMARY KEY ("event_id", "lot");

-- AlterTable
ALTER TABLE "events_tickets" DROP COLUMN "lot_id",
ADD COLUMN     "lot" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "events_tickets" ADD CONSTRAINT "events_tickets_event_id_lot_fkey" FOREIGN KEY ("event_id", "lot") REFERENCES "events_lots"("event_id", "lot") ON DELETE RESTRICT ON UPDATE CASCADE;
