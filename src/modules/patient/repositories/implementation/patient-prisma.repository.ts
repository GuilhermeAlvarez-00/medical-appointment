import { prismaClient } from "../../../../infra/database/prisma.config";
import { TPatient } from "../../entities/patient.entity";
import { IPatientRepository } from "../patient.repository";

export class PatientPrismaRepository implements IPatientRepository {
  async save(data: TPatient) {
    const patient = await prismaClient.patient.create({
      data: {
        document: data.document,
        email: data.email,
        userId: data.userId,
      },
    });

    return patient;
  }

  async findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<TPatient | null> {
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
}

