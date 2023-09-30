import { describe, test, expect } from "vitest";
import { randomUUID } from "crypto";
import {
  CreateDoctorUseCase,
  CreateDoctorUseCaseRequest,
} from "../create-doctor.usecase";
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repositoriy";
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor-memory.repository";

describe("Doctor Use Case", () => {
  test("Should create a doctor", async () => {
    const doctorMock: CreateDoctorUseCaseRequest = {
      username: "username",
      name: "name",
      password: "password",
      email: "email",
      crm: "123456",
      specialityId: randomUUID(),
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository
    );
    const doctorCreated = await createDoctorUseCase.execute(doctorMock);

    expect(doctorCreated).toHaveProperty("id");
  });
  test("Should not create a doctor with a user that already exists", async () => {
    const doctorMock: CreateDoctorUseCaseRequest = {
      username: "username",
      name: "name",
      password: "password",
      email: "email",
      crm: "123456",
      specialityId: randomUUID(),
    };

    const doctorMockDuplicated: CreateDoctorUseCaseRequest = {
      username: "username",
      name: "name_duplicated",
      password: "password",
      email: "email_duplicated",
      crm: "123457",
      specialityId: randomUUID(),
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository
    );

    await createDoctorUseCase.execute(doctorMock);

    expect(async () => {
      await createDoctorUseCase.execute(doctorMockDuplicated);
    }).rejects.toThrow("Username already exists");
  });

  test("Should not create a doctor if the CRM already exists", async () => {
    const doctorMock: CreateDoctorUseCaseRequest = {
      username: "username",
      name: "name",
      password: "password",
      email: "email",
      crm: "123456",
      specialityId: randomUUID(),
    };

    const doctorMockDuplicated: CreateDoctorUseCaseRequest = {
      username: "username_duplicated",
      name: "name_duplicated",
      password: "password",
      email: "email_duplicated",
      crm: "123456",
      specialityId: randomUUID(),
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository
    );

    await createDoctorUseCase.execute(doctorMock);

    expect(async () => {
      await createDoctorUseCase.execute(doctorMockDuplicated);
    }).rejects.toThrow("CRM already exists");
  });
});
