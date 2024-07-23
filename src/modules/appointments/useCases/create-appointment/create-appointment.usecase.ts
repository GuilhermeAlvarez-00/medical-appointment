import { CustomError } from "../../../../errors/custom-error";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";
import { IPatientRepository } from "../../../patient/repositories/patient.repository";

type TCreateAppointmentRequest = {
  doctorId: string;
  date: Date;
};

export class CreateAppointmentUseCase {
  constructor(private patientRepository: IPatientRepository, private doctorRepository: IDoctorRepository) {}
  async excute(data: TCreateAppointmentRequest, userId: string) {
    const patient = await this.patientRepository.findByUserId(userId);

    if (!patient) {
      throw new CustomError("Patient does not exits");
    }

    const doctor = await this.doctorRepository.findById(data.doctorId);

    if (!doctor) {
      throw new CustomError("Doctor does not exits");
    }
  }
}

