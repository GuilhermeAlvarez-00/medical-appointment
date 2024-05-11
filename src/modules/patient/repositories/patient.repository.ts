import { TPatient } from "../entities/patient.entity";
import { TCreatePatientRequest } from "../useCases/create-patient/create-patient.usecase";

export type IPatientRepository = {
  save: (data: TPatient) => Promise<TPatient>;
  findByDocumentOrEmail: (
    document: string,
    email: string
  ) => Promise<TPatient | null>;
};

