import { P } from "vitest/dist/reporters-5f784f42";
import { CustomError } from "../../../../errors/custom-error";
import { DoctorInfo, DoctorInfoProps } from "../../entities/doctor-info.entity";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorInfoUseCaseProps = Omit<DoctorInfoProps, "doctorId">;

export class CreateDoctorInfoUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}
  async execute(data: CreateDoctorInfoUseCaseProps, userId: string) {
    const doctorByUserId = await this.doctorRepository.findBytUserId(userId);

    if (!doctorByUserId) {
      throw new CustomError("Doctor does not exist");
    }

    const doctorInfo = DoctorInfo.create({
      ...data,
      doctorId: doctorByUserId.id,
    });
    return doctorInfo;
  }
}
