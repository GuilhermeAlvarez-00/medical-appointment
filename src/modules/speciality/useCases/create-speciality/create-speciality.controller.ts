import { Request, Response } from "express";
import { ISpecialityRepository } from "../../repositories/speciality.repository";
import { CreateSpecialityUseCase } from "./create-speciality.usecase";

export class CreateSpecialityController {
  constructor(private specialityRepository: ISpecialityRepository) {}
  async handle(req: Request, res: Response) {
    try {
      const specialityUseCase = new CreateSpecialityUseCase(
        this.specialityRepository
      );

      const speciality = await specialityUseCase.execute(req.body);

      return res.status(201).json(speciality);
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}
