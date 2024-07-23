import { prismaClient } from "../../../../infra/database/prisma.config";
import { Patient, TPatient } from "../../entities/patient.entity";
import { IPatientRepository } from "../patient.repository";

export class PatientPrismaRepository implements IPatientRepository {
  async save(data: Patient): Promise<Patient> {
    const patient = await prismaClient.patient.create({
      data: {
        document: data.document,
        email: data.email,
        userId: data.userId,
      },
    });

    return patient;
  }

  async findByDocumentOrEmail(document: string, email: string): Promise<TPatient | null> {
    const patient = await prismaClient.patient.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            document,
          },
        ],
      },
    });

    return patient;
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await prismaClient.patient.findUnique({
      where: {
        id,
      },
    });

    return patient;
  }

  async findByUserId(userId: string): Promise<Patient | null> {
    const patient = prismaClient.patient.findUnique({
      where: {
        userId,
      },
    });

    return patient || null;
  }
}

