import { CustomError } from "../../../../errors/custom-error";
import { ISpecialityRepository } from "../../../speciality/repositories/speciality.repository";
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
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ) {}

  async execute(data: CreateDoctorUseCaseRequest) {
    const speciality = await this.specialityRepository.findById(
      data.specialityId
    );

    if (!speciality) {
      throw new CustomError("Speciality does not exists");
    }

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const user = await User.create({
      name: data.name,
      password: data.password,
      username: data.username,
    });

    const userCreated = await this.userRepository.save(user);

    const crmExists = await this.doctorRepository.findByCRM(data.crm);

    if (crmExists) {
      throw new CustomError("CRM already exists");
    }

    const doctor = Doctor.create({
      crm: data.crm,
      email: data.email,
      specialityId: data.specialityId,
      userId: userCreated.id,
    });

    const doctorCreated = await this.doctorRepository.save(doctor);

    return doctorCreated;
  }
}
