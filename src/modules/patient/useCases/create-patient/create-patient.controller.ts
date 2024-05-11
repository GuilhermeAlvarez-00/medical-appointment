import { Request, Response } from "express";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { IPatientRepository } from "../../repositories/patient.repository";
import { CreatePatientUseCase } from "./create-patient.usecase";

export class CreatePatientController {
  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const createPatientUseCase = new CreatePatientUseCase(
        this.userRepository,
        this.patientRepository
      );

      const result = await createPatientUseCase.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}
