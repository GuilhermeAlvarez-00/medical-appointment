import { randomUUID } from "crypto";
import { prismaClient } from "../../../../../infra/database/prisma.config";
import { DoctorScheduleProps } from "../../../entities/doctor-schedule";
import { IDoctorScheduleRepository } from "../../doctor-schedule.repository";

export class DoctorSchedulePrismaRepository implements IDoctorScheduleRepository {
	async save(data: DoctorScheduleProps) {
		await prismaClient.$transaction([
			prismaClient.doctorSchedules.deleteMany({
				where: {
					doctorId: data.doctorId
				}
			}),
			prismaClient.doctorSchedules.createMany({
				data: data?.schedules.map(item => ({
					...item,
					doctorId: data?.doctorId,
					id: item?.id ?? randomUUID()
				}))
			}),
		])

		return;
	}
}
