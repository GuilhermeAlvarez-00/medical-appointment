import { CustomError } from "../../../../errors/custom-error";
import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../../repositories/speciality.repository";

type ISpeciality = {
  name: string;
  description: string;
};

export class CreateSpecialityUseCase {
  constructor(private specialityRepository: ISpecialityRepository) {}
  async execute(data: ISpeciality) {
    const speciality = Speciality.create(data);

    const specialityAlreadyExists = await this.specialityRepository.findByName(
      data.name
    );

    if (specialityAlreadyExists) {
      throw new CustomError(
        "This speciality already exists",
        400,
        "SPECIALITY_ALREADY_EXISTS"
      );
    }

    const specialityCreated = await this.specialityRepository.save(speciality);

    return specialityCreated;
  }
}
