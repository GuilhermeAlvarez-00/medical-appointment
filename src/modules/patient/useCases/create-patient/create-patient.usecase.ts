import { CustomError } from "../../../../errors/custom-error";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Patient } from "../../entities/patient.entity";
import { IPatientRepository } from "../../repositories/patient.repository";

export type TCreatePatientRequest = Record<
  "username" | "password" | "email" | "name" | "document",
  string
>;

export class CreatePatientUseCase {
  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRepository
  ) {}

  async execute(data: TCreatePatientRequest) {
    const userExists = await this.userRepository.findByUsername(data.username);
    const patientExists = await this.patientRepository.findByDocumentOrEmail(
      data.document,
      data.email
    );

    if (userExists) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    if (patientExists) {
      throw new CustomError("Patient already exists");
    }

    const user = await User.create({
      name: data.name,
      username: data.username,
      password: data.password,
    });

    const userSaved = await this.userRepository.save(user);
    const patient = Patient.create({
      document: data.document,
      email: data.email,
      userId: userSaved.id,
    });
    const patientSaved = await this.patientRepository.save(patient);

    return patientSaved;
  }
}

