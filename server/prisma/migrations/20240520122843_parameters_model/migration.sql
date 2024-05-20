-- CreateTable
CREATE TABLE "parameters" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "key_info" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "visible" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "parameters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parameters_uuid_key" ON "parameters"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "parameters_key_key" ON "parameters"("key");
