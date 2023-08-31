import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom-error";

type ISpeciality = {
  name: string;
  description: string;
};

export class Speciality {
  id: string;
  name: string;
  description: string;

  constructor({ name, description }: ISpeciality) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
  }

  static create({ name, description }: ISpeciality) {
    if (!name) {
      throw new CustomError(
        "Speciality name is required",
        400,
        "NAME_REQUIRED_ERROR"
      );
    }

    const speciality = new Speciality({ name, description });
    return speciality;
  }
}
