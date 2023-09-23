import { Router } from "express";
import { specialityController } from "../modules/speciality/useCases/create-speciality";
import { ensureAuthentication } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { ensureAdmin } from "../infra/shared/http/middleware/ensure-admin.middlaware";

const specialityRouter = Router();

specialityRouter.post(
  "/specialities",
  ensureAuthentication,
  ensureAdmin,
  async (req, res) => {
    await specialityController.handle(req, res);
  }
);

export { specialityRouter };
