import { DoctorInfo } from "../../../entities/doctor-info.entity";
import { IDoctorInfoRepository } from "../../doctor-info.repository";

export class DoctorInfoMemoryRepository implements IDoctorInfoRepository {
  doctorInfo: DoctorInfo[] = [];
  async save(doctorInfo: DoctorInfo): Promise<DoctorInfo | null> {
    this.doctorInfo.push(doctorInfo);
    return doctorInfo;
  }
}
