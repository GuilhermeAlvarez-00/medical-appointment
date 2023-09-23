import { Router } from "express";
import { createUserController } from "../modules/users/usecases/create-user";
import { authenticateUserController } from "../modules/users/usecases/authenticate-user";

const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

userRouter.post("/login", async (req, res) => {
  await authenticateUserController.handle(req, res);
});

export { userRouter };
