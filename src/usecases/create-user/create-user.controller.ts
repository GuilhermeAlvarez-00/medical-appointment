import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";
import { logger } from "../../utils/logger";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    logger.info("User being created");
    try {
      const { name, username, password } = request.body;

      if (request.body.isAdmin) {
        throw new Error("Admin users cannot be created");
      }

      const useCase = new CreateUserUseCase();
      const result = await useCase.execute({ name, username, password });

      return response.json(result);
    } catch (error: any) {
      logger.error(error.stack);
      return response.status(error.statusCode).end(error.stack);
    }
  }
}
