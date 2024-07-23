import { Patient, TPatient } from "../entities/patient.entity";
import { TCreatePatientRequest } from "../useCases/create-patient/create-patient.usecase";

export type IPatientRepository = {
  save: (data: Patient) => Promise<Patient>;
  findByDocumentOrEmail: (document: string, email: string) => Promise<TPatient | null>;
  findById: (id: string) => Promise<Patient | null>;
  findByUserId: (userId: string) => Promise<Patient | null>;
};

