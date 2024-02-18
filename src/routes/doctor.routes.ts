import { Router } from "express";

import { createDoctorController } from "../modules/doctor/useCases/create-doctor";

const doctorRouter = Router();

doctorRouter.post("/doctors", async (req, res) => {
  await createDoctorController.handle(req, res);
});

export { doctorRouter };
