import { DoctorInfo } from "../../../entities/doctor-info.entity";
import { IDoctorInfoRepository } from "../../doctor-info.repository";

export class DoctorInfoMemoryRepository implements IDoctorInfoRepository {
  doctorInfo: DoctorInfo[] = [];
  async saveOrUpdate(doctorInfo: DoctorInfo): Promise<DoctorInfo | null> {
    const doctorIndex = this.doctorInfo.findIndex(
      (item) => item.doctorId === doctorInfo.doctorId
    );

    if (doctorIndex) {
      const doctor = this.doctorInfo[doctorIndex];
      this.doctorInfo[doctorIndex] = {
        ...doctor,
        duration: doctorInfo.duration,
        price: doctorInfo.price,
        startAt: doctorInfo.startAt,
        endAt: doctorInfo.endAt,
      };

      return doctorInfo;
    }

    this.doctorInfo.push(doctorInfo);
    return doctorInfo;
  }
}
