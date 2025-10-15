import { Request, Response } from "express";
import { IDoctorScheduleRepository } from "../../repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { CreateDoctorScheduleUseCase } from "./create-doctor-schedule.usecase";

export class CreateDoctorScheduleController {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { schedules } = request.body;
      const doctorId = request.userId;

      const createDoctorScheduleUseCase = new CreateDoctorScheduleUseCase(
        this.doctorRepository,
        this.doctorScheduleRepository,
      );

      await createDoctorScheduleUseCase.execute({
        doctorId,
        schedules,
      });

      return response.status(201).end();
    } catch (error: any) {
      console.log("ERROR", error);
      return response
        .status(error?.statusCode || 400)
        .json({ message: error?.message || "error" });
    }
  }
}
