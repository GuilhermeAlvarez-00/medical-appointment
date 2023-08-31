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

    const specialityCreated = await this.specialityRepository.save(speciality);

    return specialityCreated;
  }
}
