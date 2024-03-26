-- CreateTable
CREATE TABLE "churchs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "churchs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "church_leaders" (
    "id" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "functionName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "church_leaders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "church_departments" (
    "id" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "church_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "church_department_members" (
    "id" TEXT NOT NULL,
    "church_department_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "function_name" TEXT NOT NULL,
    "sub_function" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "church_department_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "churchs_name_key" ON "churchs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "churchs_username_key" ON "churchs"("username");

-- CreateIndex
CREATE UNIQUE INDEX "church_leaders_email_key" ON "church_leaders"("email");

-- CreateIndex
CREATE UNIQUE INDEX "church_departments_username_key" ON "church_departments"("username");

-- CreateIndex
CREATE UNIQUE INDEX "church_department_members_email_key" ON "church_department_members"("email");

-- AddForeignKey
ALTER TABLE "church_leaders" ADD CONSTRAINT "church_leaders_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "church_departments" ADD CONSTRAINT "church_departments_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "church_departments" ADD CONSTRAINT "church_departments_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "church_department_members" ADD CONSTRAINT "church_department_members_church_department_id_fkey" FOREIGN KEY ("church_department_id") REFERENCES "church_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
