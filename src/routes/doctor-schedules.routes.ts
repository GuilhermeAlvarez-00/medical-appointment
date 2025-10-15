import { Router } from "express";
import { createDoctorScheduleController } from "../modules/doctor/useCases/create-doctor-schedule";
import { ensureAuthentication } from "../infra/shared/http/middleware/ensure-authenticate.middleware";

const doctorScheduleRouter = Router();

doctorScheduleRouter.post("/doctor-schedule", ensureAuthentication, (req, res) => createDoctorScheduleController.handle(req, res));

export { doctorScheduleRouter };
