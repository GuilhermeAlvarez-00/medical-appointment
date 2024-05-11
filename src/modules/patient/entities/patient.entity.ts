import { randomUUID } from "crypto";
import { TCreatePatientRequest } from "../useCases/create-patient/create-patient.usecase";
import { CustomError } from "../../../errors/custom-error";

export type TPatient = {
  document: string;
  email: string;
  userId: string;
};

export class Patient {
  id: string;
  userId: string;
  email: string;
  document: string;

  private constructor(props: TPatient) {
    if (!props.email) {
      throw new CustomError("Email is required");
    }
    if (!props.document || props.document.length <= 5) {
      throw new CustomError("Invalid document");
    }

    this.id = randomUUID();
    this.userId = props.userId;
    this.email = props.email;
    this.document = props.document;
  }

  static create(data: TPatient) {
    const patient = new Patient(data);
    return patient;
  }
}

