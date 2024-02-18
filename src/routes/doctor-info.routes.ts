import { Router } from "express";
import { createDoctorInfoController } from "../modules/doctor/useCases/create-doctor-info";
import { ensureAuthentication } from "../infra/shared/http/middleware/ensure-authenticate.middleware";

const doctorInfoRouter = Router();

doctorInfoRouter.post(
  "/doctor-info",
  ensureAuthentication,
  async (req, res) => {
    await createDoctorInfoController.handle(req, res);
  }
);

export { doctorInfoRouter };
