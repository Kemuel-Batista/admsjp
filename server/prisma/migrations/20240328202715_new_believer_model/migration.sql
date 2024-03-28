-- CreateTable
CREATE TABLE "new_believers" (
    "id" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "lgpd" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "new_believers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "new_believers_phone_key" ON "new_believers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "new_believers_email_key" ON "new_believers"("email");

-- AddForeignKey
ALTER TABLE "new_believers" ADD CONSTRAINT "new_believers_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
