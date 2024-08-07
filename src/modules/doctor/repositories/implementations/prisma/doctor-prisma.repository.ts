import { prismaClient } from "../../../../../infra/database/prisma.config";
import { Doctor } from "../../../entities/doctor.entity";
import { IDoctorRepository } from "../../doctor.repository";

export class DoctorPrismaRepository implements IDoctorRepository {
  async save(data: Doctor): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.create({
      data: {
        crm: data.crm,
        email: data.email,
        id: data.id,
        userId: data.userId,
        specialityId: data.specialityId,
      },
    });

    return doctor || null;
  }

  async findByCRM(crm: string): Promise<string | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: {
        crm,
      },
    });

    return doctor?.crm || null;
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: {
        userId,
      },
    });

    return doctor || null;
  }

  async findById(id: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: {
        id,
      },
    });

    return doctor || null;
  }
}

