import { describe, test, expect, beforeAll } from "vitest";
import { randomUUID } from "crypto";
import {
  CreateDoctorUseCase,
  CreateDoctorUseCaseRequest,
} from "../create-doctor.usecase";
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repositoriy";
import { DoctorMemoryRepository } from "../../../repositories/implementations/in-memory/doctor-memory.repository";
import { Speciality } from "../../../../speciality/entities/speciality.entity";
import { SpecialityMemoryRepository } from "../../../../speciality/repositories/implementations/speciality.memory.repository";
import { ISpecialityRepository } from "../../../../speciality/repositories/speciality.repository";

let specialityRepository: ISpecialityRepository;
let speciality: Speciality;

beforeAll(async () => {
  specialityRepository = new SpecialityMemoryRepository();

  speciality = Speciality.create({
    name: "speciality_test_name",
    description: "speciality_description_name",
  });

  await specialityRepository.save(speciality);
});

describe("Doctor Use Case", () => {
  test("Should create a doctor", async () => {
    const doctorMock: CreateDoctorUseCaseRequest = {
      username: "username",
      name: "name",
      password: "password",
      email: "email",
      crm: "123456",
      specialityId: speciality.id,
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
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
      specialityId: speciality.id,
    };

    const doctorMockDuplicated: CreateDoctorUseCaseRequest = {
      username: "username",
      name: "name_duplicated",
      password: "password",
      email: "email_duplicated",
      crm: "123457",
      specialityId: speciality.id,
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
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
      specialityId: speciality.id,
    };

    const doctorMockDuplicated: CreateDoctorUseCaseRequest = {
      username: "username_duplicated",
      name: "name_duplicated",
      password: "password",
      email: "email_duplicated",
      crm: "123456",
      specialityId: speciality.id,
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );

    await createDoctorUseCase.execute(doctorMock);

    expect(async () => {
      await createDoctorUseCase.execute(doctorMockDuplicated);
    }).rejects.toThrow("CRM already exists");
  });

  test("Should not create a doctor missing specialityId", async () => {
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
      doctorRepository,
      specialityRepository
    );

    expect(async () => {
      await createDoctorUseCase.execute(doctorMock);
    }).rejects.toThrow("Speciality does not exists");
  });
});
