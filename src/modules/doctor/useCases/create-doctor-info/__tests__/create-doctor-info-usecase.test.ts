import dayjs from "dayjs";
import { describe, expect, test } from "vitest";
import { CreateDoctorInfoUseCase } from "../create-doctor-info.usecase";
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor-memory.repository";
import { randomUUID } from "crypto";

type CreateDoctorInfoUseCaseRequest = {
  startAt: string;
  endAt: string;
  price: number;
  duration: number;
};

describe("Create Doctor Info", () => {
  test("Should not create a doctor info if doctor not exists", () => {
    const doctorRepository = new DoctorMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository
    );

    expect(async () => {
      await createDoctorInfoUseCase.execute(
        {
          startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
          endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
          price: 150,
          duration: 10,
        },
        "FAKE_ID"
      );
    }).rejects.toThrow("Doctor does not exist");
  });

  test("Should not create a doctor if end date is before that start date", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository
    );

    const userId = randomUUID();

    const doctor = await doctorRepository.save({
      crm: "crm",
      email: "email",
      id: randomUUID(),
      specialityId: "specialityId",
      userId,
    });

    expect(async () => {
      await createDoctorInfoUseCase.execute(
        {
          startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
          endAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
          price: 150,
          duration: 10,
        },
        String(doctor?.userId)
      );
    }).rejects.toThrow("End time cannot be earlier than start time");
  });
  test("Should not create a doctor if start date is invalid", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository
    );

    const userId = randomUUID();

    const doctor = await doctorRepository.save({
      crm: "crm",
      email: "email",
      id: randomUUID(),
      specialityId: "specialityId",
      userId,
    });

    expect(async () => {
      await createDoctorInfoUseCase.execute(
        {
          startAt: "99:99",
          endAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
          price: 150,
          duration: 10,
        },
        String(doctor?.userId)
      );
    }).rejects.toThrow("Invalid StartAt");
  });

  test("Should not create a doctor if end date is invalid", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository
    );

    const userId = randomUUID();

    const doctor = await doctorRepository.save({
      crm: "crm",
      email: "email",
      id: randomUUID(),
      specialityId: "specialityId",
      userId,
    });

    expect(async () => {
      await createDoctorInfoUseCase.execute(
        {
          startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
          endAt: "99:99",
          price: 150,
          duration: 10,
        },
        String(doctor?.userId)
      );
    }).rejects.toThrow("Invalid EndAt");
  });
});
