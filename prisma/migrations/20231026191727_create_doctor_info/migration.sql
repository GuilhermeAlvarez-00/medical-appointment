-- CreateTable
CREATE TABLE "doctor_info" (
    "id" TEXT NOT NULL,
    "startAt" TEXT NOT NULL,
    "endAt" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctor_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_info_doctorId_key" ON "doctor_info"("doctorId");

-- AddForeignKey
ALTER TABLE "doctor_info" ADD CONSTRAINT "doctor_info_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
