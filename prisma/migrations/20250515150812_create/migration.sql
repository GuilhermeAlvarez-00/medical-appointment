/*
  Warnings:

  - You are about to drop the column `endAt` on the `doctor_info` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `doctor_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctor_info" DROP COLUMN "endAt",
DROP COLUMN "startAt";

-- CreateTable
CREATE TABLE "doctor_schedules" (
    "id" TEXT NOT NULL,
    "startAt" TEXT NOT NULL,
    "endAt" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctor_schedules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
