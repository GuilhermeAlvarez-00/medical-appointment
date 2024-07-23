import { Patient, TPatient } from "../../entities/patient.entity";
import { IPatientRepository } from "../patient.repository";

export class PatientInMemoryRepository implements IPatientRepository {
  patients: Patient[] = [];

  async save(data: Patient): Promise<Patient> {
    this.patients.push(data);

    return data;
  }

  async findByDocumentOrEmail(document: string, email: string): Promise<TPatient | null> {
    const patient = this.patients.find((item) => item.document === document || item.email === email);

    return patient || null;
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = this.patients.find((item) => item.userId === id);

    return patient || null;
  }

  async findByUserId(userId: string): Promise<Patient | null> {
    const patient = this.patients.find((item) => item.userId === userId);

    return patient || null;
  }
}

