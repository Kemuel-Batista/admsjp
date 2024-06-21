/*
  Warnings:

  - The primary key for the `events_tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `events_tickets` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `events_tickets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `events_tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_by` to the `events_tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events_tickets" DROP CONSTRAINT "events_tickets_user_id_fkey";

-- DropIndex
DROP INDEX "events_tickets_uuid_key";

-- AlterTable
ALTER TABLE "events_tickets" DROP CONSTRAINT "events_tickets_pkey",
DROP COLUMN "user_id",
DROP COLUMN "uuid",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "cpf" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "events_tickets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "events_tickets_id_seq";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "transaction_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "events_tickets_id_key" ON "events_tickets"("id");

-- AddForeignKey
ALTER TABLE "events_tickets" ADD CONSTRAINT "events_tickets_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
