-- CreateTable
CREATE TABLE "Log" (
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

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Log_uuid_key" ON "Log"("uuid");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
