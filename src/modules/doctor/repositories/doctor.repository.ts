import { Doctor } from "../entities/doctor.entity";

export interface IDoctorRepository {
  save(doctor: Doctor): Promise<Doctor | null>;
  findByCRM(crm: string): Promise<string | null>;
}
