import { prismaClient } from "../../../../../infra/database/prisma.config";
import { DoctorInfo } from "../../../entities/doctor-info.entity";
import { DoctorInfo as DoctorInfoPrisma } from "@prisma/client";
import { IDoctorInfoRepository } from "../../doctor-info.repository";

const mapper = (data: DoctorInfoPrisma): DoctorInfo => {
  return {
    doctorId: data.doctorId,
    duration: data.duration,
    endAt: data.endAt,
    startAt: data.startAt,
    price: Number(data.price),
    id: data.id,
  };
};

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
  async save(data: DoctorInfo): Promise<DoctorInfo | null> {
    const doctorInfo = await prismaClient.doctorInfo.create({
      data: {
        duration: data.duration,
        endAt: data.endAt,
        startAt: data.startAt,
        price: Number(data.price),
        doctorId: data.doctorId,
        id: data.id,
      },
    });

    return mapper(doctorInfo);
  }
}
