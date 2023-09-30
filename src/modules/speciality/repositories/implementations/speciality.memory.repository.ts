import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../speciality.repository";

export class SpecialityMemoryRepository implements ISpecialityRepository {
  specialities: Speciality[] = [];

  async save(data: Speciality): Promise<Speciality> {
    this.specialities.push(data);
    return data;
  }

  async findByName(name: string): Promise<Speciality | null> {
    return this.specialities.find((item) => item.name === name) ?? null;
  }

  async findById(id: string): Promise<Speciality | null> {
    return this.specialities.find((item) => item.id === id) ?? null;
  }
}
