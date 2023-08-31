import { Router } from "express";
import { createUserController } from "../modules/users/usecases/create-user";

const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

export { userRouter };
