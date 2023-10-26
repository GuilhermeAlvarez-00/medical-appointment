import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom-error";
import { compareEndTimeIsAfter, validateTime } from "../../../utils/date";

export type DoctorInfoProps = {
  doctorId: string;
  startAt: string;
  endAt: string;
  price: number;
  duration: number;
};

export class DoctorInfo {
  id: string;
  doctorId: string;
  startAt: string;
  endAt: string;
  price: number;
  duration: number;
  private constructor(props: DoctorInfoProps) {
    if (!props.doctorId) {
      throw new CustomError("Doctor does not exist");
    }

    if (props.duration <= 0) {
      throw new CustomError("Invalid duration");
    }

    if (!validateTime(props.startAt)) {
      throw new CustomError("Invalid StartAt");
    }

    if (!validateTime(props.endAt)) {
      throw new CustomError("Invalid EndAt");
    }

    if (!compareEndTimeIsAfter(props.startAt, props.endAt)) {
      throw new CustomError("End time cannot be earlier than start time");
    }

    (this.id = randomUUID()),
      (this.doctorId = props.doctorId),
      (this.startAt = props.startAt),
      (this.endAt = props.endAt),
      (this.price = props.price);
    this.duration = props.duration;
  }

  static create(data: DoctorInfoProps) {
    const doctorInfo = new DoctorInfo(data);
    return doctorInfo;
  }
}
