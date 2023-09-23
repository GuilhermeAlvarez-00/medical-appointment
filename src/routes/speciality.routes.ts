import { Router } from "express";
import { specialityController } from "../modules/speciality/useCases/create-speciality";
import { ensureAuthentication } from "../infra/shared/http/middleware/ensure-authenticate.middleware";

const specialityRouter = Router();

specialityRouter.post(
  "/specialities",
  ensureAuthentication,
  async (req, res) => {
    await specialityController.handle(req, res);
  }
);

export { specialityRouter };
