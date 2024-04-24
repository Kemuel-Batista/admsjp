-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "oldValue" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "note" TEXT,
    "jsonRequest" TEXT,
    "jsonResponse" TEXT,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Log_uuid_key" ON "Log"("uuid");
