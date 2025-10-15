import { DoctorScheduleProps } from "../entities/doctor-schedule";

export interface IDoctorScheduleRepository {
	save(data: DoctorScheduleProps): Promise<void>;
}
