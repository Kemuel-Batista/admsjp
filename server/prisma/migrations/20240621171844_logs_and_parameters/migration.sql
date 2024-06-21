-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "old_value" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "note" TEXT,
    "jsonRequest" TEXT,
    "jsonResponse" TEXT,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "logs_uuid_key" ON "logs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "parameters_uuid_key" ON "parameters"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "parameters_key_key" ON "parameters"("key");

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
