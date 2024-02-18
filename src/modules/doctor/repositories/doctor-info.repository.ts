import { DoctorInfo } from "../entities/doctor-info.entity";

export interface IDoctorInfoRepository {
  saveOrUpdate(doctorInfo: DoctorInfo): Promise<DoctorInfo | null>;
}
