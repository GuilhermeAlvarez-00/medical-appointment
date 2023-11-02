import { CustomError } from "../../../../errors/custom-error";
import { DoctorInfo, DoctorInfoProps } from "../../entities/doctor-info.entity";
import { IDoctorInfoRepository } from "../../repositories/doctor-info.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorInfoUseCaseProps = Omit<DoctorInfoProps, "doctorId">;

export class CreateDoctorInfoUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository
  ) {}
  async execute(data: CreateDoctorInfoUseCaseProps, userId: string) {
    const doctorByUserId = await this.doctorRepository.findByUserId(userId);

    if (!doctorByUserId) {
      throw new CustomError("Doctor does not exist");
    }

    const doctorInfo = DoctorInfo.create({
      ...data,
      doctorId: doctorByUserId.id,
    });

    const doctorCreated = await this.doctorInfoRepository.save(doctorInfo);
    return doctorCreated;
  }
}
