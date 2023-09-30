import { randomUUID } from "crypto";
import { CustomError } from "../../errors/custom-error";

export type DoctorProps = {
  crm: string;
  email: string;
  specialityId: string;
  userId: string;
};

export class Doctor {
  id: string;
  crm: string;
  email: string;
  specialityId: string;
  userId: string;

  private constructor(props: DoctorProps) {
    if (!props.crm) {
      throw new CustomError("CRM is required");
    }

    if (props.crm.length !== 6) {
      throw new CustomError("CRM is invalid");
    }

    if (!props.email) {
      throw new CustomError("Email is required");
    }

    this.id = randomUUID();
    this.crm = props.crm;
    this.email = props.email;
    this.specialityId = props.specialityId;
    this.userId = props.userId;
  }

  static create(props: DoctorProps) {
    const doctor = new Doctor(props);

    return doctor;
  }
}
