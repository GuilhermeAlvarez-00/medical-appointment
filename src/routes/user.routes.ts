import { Router } from "express";
import { createUserController } from "../modules/users/usecases/create-user";
import { specialityController } from "../modules/speciality/useCases/create-speciality";

const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

userRouter.post("/specialities", async (req, res) => {
  await specialityController.handle(req, res);
});

export { userRouter };
