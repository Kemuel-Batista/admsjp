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

-- CreateIndex
CREATE UNIQUE INDEX "logs_uuid_key" ON "logs"("uuid");

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
