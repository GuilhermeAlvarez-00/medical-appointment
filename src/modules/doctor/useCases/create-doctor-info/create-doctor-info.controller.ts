import { Request, Response } from "express";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { IDoctorInfoRepository } from "../../repositories/doctor-info.repository";
import { CreateDoctorInfoUseCase } from "./create-doctor-info.usecase";

export class CreateDoctorInfoController {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository
  ) {}
  async handle(request: Request, response: Response) {
    try {
      const { body, userId } = request;

      const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
        this.doctorRepository,
        this.doctorInfoRepository
      );
      const result = await createDoctorInfoUseCase.execute(body, userId);

      return response.json(result);
    } catch (error: any) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
