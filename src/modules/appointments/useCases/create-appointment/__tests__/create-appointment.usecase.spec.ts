import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";
import { CreateAppointmentUseCase } from "../create-appointment.usecase";
import { PatientInMemoryRepository } from "../../../../patient/repositories/implementation/patient-inMemory.repository";
import { DoctorMemoryRepository } from "../../../../doctor/repositories/implementations/in-memory/doctor-memory.repository";

const patientInMemoryRepository = new PatientInMemoryRepository();
const doctorInMemoryRepository = new DoctorMemoryRepository();

describe("Create Appointment", () => {
  test("Should not create an appointment without a valid patient", async () => {
    const createAppointmentUseCase = new CreateAppointmentUseCase(patientInMemoryRepository, doctorInMemoryRepository);

    expect(async () => {
      await createAppointmentUseCase.excute(
        {
          doctorId: randomUUID(),
          date: new Date(),
        },
        "INVALID_USER_ID"
      );
    }).rejects.toThrow("Patient does not exits");
  });

  test("Should not create a doctor without a valid doctor", async () => {
    const createAppointmentUseCase = new CreateAppointmentUseCase(patientInMemoryRepository, doctorInMemoryRepository);

    const patient = await patientInMemoryRepository.save({
      document: "123456",
      email: "patient@gmail.com",
      id: randomUUID(),
      userId: randomUUID(),
    });

    expect(async () => {
      await createAppointmentUseCase.excute(
        {
          doctorId: "INVALID_DOCTOR_ID",
          date: new Date(),
        },
        patient.userId
      );
    }).rejects.toThrow("Doctor does not exits");
  });
});

