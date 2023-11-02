import { DoctorInfo } from "../entities/doctor-info.entity";

export interface IDoctorInfoRepository {
  save(doctorInfo: DoctorInfo): Promise<DoctorInfo | null>;
}
