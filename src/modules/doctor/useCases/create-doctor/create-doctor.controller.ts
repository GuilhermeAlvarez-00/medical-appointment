import { Request, Response } from "express";
import {
  CreateDoctorUseCase,
  CreateDoctorUseCaseRequest,
} from "./create-doctor.usecase";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { ISpecialityRepository } from "../../../speciality/repositories/speciality.repository";
import { CustomError } from "../../../../errors/custom-error";

export class CreateDoctorController {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const body = request.body as CreateDoctorUseCaseRequest;

      const createDoctorUseCase = new CreateDoctorUseCase(
        this.userRepository,
        this.doctorRepository,
        this.specialityRepository
      );
      const doctor = await createDoctorUseCase.execute(body);

      return response.status(201).json(doctor);
    } catch (error: any) {
      console.log(error);
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
