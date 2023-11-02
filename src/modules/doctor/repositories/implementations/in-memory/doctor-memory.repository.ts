import { Doctor } from "../../../entities/doctor.entity";
import { IDoctorRepository } from "../../doctor.repository";

export class DoctorMemoryRepository implements IDoctorRepository {
  doctors: Doctor[] = [];

  async save(doctor: Doctor): Promise<Doctor | null> {
    this.doctors.push(doctor);
    return doctor;
  }

  async findByCRM(crm: string): Promise<string | null> {
    const crmExists = this.doctors.find((item) => item.crm === crm);

    if (!crmExists) return null;

    return crm;
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    return this.doctors.find((item) => item.userId === userId) ?? null;
  }
}
