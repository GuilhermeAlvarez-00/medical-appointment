import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom-error";
import { compareEndTimeIsAfter, validateTime } from "../../../utils/date";

export type TSchedules = {
  id?: string;
  startAt: string;
  endAt: string;
  dayOfWeek: number;
};

export type DoctorScheduleProps = {
  doctorId: string;
  schedules: TSchedules[];
};

export class DoctorSchedule {
  doctorId: string;
  schedules: TSchedules[];

  constructor(props: DoctorScheduleProps) {
    if (!props.schedules?.length) {
      throw new CustomError("Invalid schedules", 400);
    }

    validateDuplicatedSchedules(props.schedules);
    validateTimes(props.schedules);

    this.doctorId = props.doctorId;
    this.schedules = createSchedules(props.schedules);
  }

  static create(doctorSchedules: DoctorScheduleProps) {
    return new DoctorSchedule(doctorSchedules);
  }
}

const validateDuplicatedSchedules = (schedules: TSchedules[]) => {
  const hasUniqueSchedules = new Set(schedules.map((item) => item.dayOfWeek));

  if (hasUniqueSchedules.size < schedules?.length) {
    throw new CustomError("Duplicated day of week", 400);
  }
};

const validateTimes = (schedules: TSchedules[]) => {
  schedules.forEach((schedule) => {
    if (!validateTime(schedule.startAt)) {
      throw new CustomError("Invalid StartAt");
    }

    if (!validateTime(schedule.endAt)) {
      throw new CustomError("Invalid EndAt");
    }

    if (!compareEndTimeIsAfter(schedule.startAt, schedule.endAt)) {
      throw new CustomError("End time cannot be earlier than start time");
    }
  });
};

const createSchedules = (schedules: TSchedules[]) => {
  return schedules.map((item) => ({
    ...item,
    id: randomUUID(),
  }));
};
