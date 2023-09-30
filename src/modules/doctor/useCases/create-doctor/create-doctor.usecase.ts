import { CustomError } from "../../../../errors/custom-error";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { UserRequest } from "../../../users/usecases/create-user/create-user.usecase";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorUseCaseRequest = UserRequest & {
  crm: string;
  email: string;
  specialityId: string;
};

export class CreateDoctorUseCase {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute(data: CreateDoctorUseCaseRequest) {
    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const user = User.create({
      name: data.name,
      password: data.password,
      username: data.username,
    });

    const createdUser = await this.userRepository.save(user);

    const crmExists = await this.doctorRepository.findByCRM(data.crm);

    if (crmExists) {
      throw new CustomError("CRM already exists");
    }

    const doctor = Doctor.create({
      crm: data.crm,
      email: data.email,
      specialityId: data.specialityId,
      userId: createdUser.id,
    });

    const createdDoctor = this.doctorRepository.save(doctor);

    return createdDoctor;
  }
}
