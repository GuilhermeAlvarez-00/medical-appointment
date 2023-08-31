import { SpecialityPrismaRepository } from "../../repositories/implementations/speciality.prisma.repository";
import { CreateSpecialityController } from "./create-speciality.controller";

const specialityRepository = new SpecialityPrismaRepository();

const specialityController = new CreateSpecialityController(
  specialityRepository
);

export { specialityController };
