import { Router } from "express";

import { ensureAuthentication } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { ensureAdmin } from "../infra/shared/http/middleware/ensure-admin.middlaware";
import { createDoctorController } from "../modules/doctor/useCases/create-doctor";

const doctorRouter = Router();

doctorRouter.post("/doctors", async (req, res) => {
  await createDoctorController.handle(req, res);
});

export { doctorRouter };
