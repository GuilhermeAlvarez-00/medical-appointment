import { test, expect, describe } from "vitest";
import { Doctor } from "../doctor.entity";

describe("Doctor entity", () => {
  test("Should create a new doctor", () => {
    const doctor = Doctor.create({
      crm: "123456",
      email: "doctor@gmail.com",
      specialityId: "SPEC_ID",
      userId: "USER_ID",
    });

    expect(doctor).toBeInstanceOf(Doctor);
    expect(doctor).toHaveProperty("id");
  });

  test("Should not create a doctor missing crm", () => {
    expect(() => {
      Doctor.create({
        crm: "",
        email: "doctor@gmail.com",
        specialityId: "SPEC_ID",
        userId: "USER_ID",
      });
    }).toThrow("CRM is required");
  });

  test("Should not create a doctor with crm invalid", () => {
    expect(() => {
      Doctor.create({
        crm: "123",
        email: "doctor@gmail.com",
        specialityId: "SPEC_ID",
        userId: "USER_ID",
      });
    }).toThrow("CRM is invalid");
  });

  test("Should not create a doctor missing email", () => {
    expect(() => {
      Doctor.create({
        crm: "123456",
        email: "",
        specialityId: "SPEC_ID",
        userId: "USER_ID",
      });
    }).toThrow("Email is required");
  });
});
