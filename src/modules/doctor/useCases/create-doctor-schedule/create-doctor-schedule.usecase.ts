import { CustomError } from "../../../../errors/custom-error";
import { DoctorSchedule, DoctorScheduleProps } from "../../entities/doctor-schedule";
import { IDoctorScheduleRepository } from "../../repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";



export class CreateDoctorScheduleUseCase {
	constructor(private doctorRepository: IDoctorRepository, private doctorScheduleRepository: IDoctorScheduleRepository) { }
	async execute(data: DoctorScheduleProps) {
		const doctor = await this.doctorRepository.findByUserId(data?.doctorId);

		if (!doctor) {
			throw new CustomError("Doctor does not exist", 400);
		}

		const doctorSchedule = DoctorSchedule.create({
			schedules: data?.schedules,
			doctorId: doctor?.id
		});

		await this.doctorScheduleRepository.save(doctorSchedule);
		return;
	}
}
