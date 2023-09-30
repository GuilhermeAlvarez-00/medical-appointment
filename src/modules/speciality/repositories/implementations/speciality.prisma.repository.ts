import { prismaClient } from "../../../../infra/database/prisma.config";
import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../speciality.repository";

export class SpecialityPrismaRepository implements ISpecialityRepository {
  async save(data: Speciality): Promise<Speciality> {
    const speciality = await prismaClient.speciality.create({
      data: {
        id: data.id,
        name: data.name,
        description: data.description,
      },
    });
    return speciality;
  }

  async findByName(name: string): Promise<Speciality | null> {
    const speciality = await prismaClient.speciality.findUnique({
      where: {
        name,
      },
    });

    return speciality;
  }

  async findById(id: string): Promise<Speciality | null> {
    const speciality = await prismaClient.speciality.findUnique({
      where: {
        id,
      },
    });

    return speciality;
  }
}
