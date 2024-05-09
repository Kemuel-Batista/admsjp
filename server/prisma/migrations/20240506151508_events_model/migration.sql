-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EVENTS');

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "initial_date" TIMESTAMP(3) NOT NULL,
    "final_date" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "visible" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "event_type" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_addresses" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "state" INTEGER NOT NULL,
    "city" INTEGER NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "events_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_lots" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "lot" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "events_lots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_tickets" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "event_id" INTEGER NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ticket" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "events_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "transaction_type" "TransactionType" NOT NULL DEFAULT 'EVENTS',
    "payment_method" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "pix_qr_code" TEXT NOT NULL,
    "paid_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "events_uuid_key" ON "events"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "events_title_key" ON "events"("title");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "events_addresses_uuid_key" ON "events_addresses"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "events_addresses_event_id_key" ON "events_addresses"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_lots_uuid_key" ON "events_lots"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "events_tickets_uuid_key" ON "events_tickets"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "orders_uuid_key" ON "orders"("uuid");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_addresses" ADD CONSTRAINT "events_addresses_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_lots" ADD CONSTRAINT "events_lots_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_tickets" ADD CONSTRAINT "events_tickets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_tickets" ADD CONSTRAINT "events_tickets_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "events_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_tickets" ADD CONSTRAINT "events_tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
