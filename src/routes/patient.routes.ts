import { Router } from "express";
import { createPatientController } from "../modules/patient/useCases/create-patient";

const patientRouter = Router();

patientRouter.post("/patient", async (req, res) => {
  await createPatientController.handle(req, res);
});

export { patientRouter };
