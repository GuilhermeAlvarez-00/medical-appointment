import { Router } from "express";
import { specialityController } from "../modules/speciality/useCases/create-speciality";

const specialityRouter = Router();

specialityRouter.post("/specialities", async (req, res) => {
  await specialityController.handle(req, res);
});

export { specialityRouter };
