import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../repositories/user.repository";
import { CustomError } from "../../../../errors/custom-error";

export class CreateUserController {
  constructor(private userRepository: IUserRepository) {}
  async handle(request: Request, response: Response) {
    logger.info("User being created");
    try {
      const { name, username, password } = request.body;

      if (request.body.isAdmin) {
        throw new CustomError("Admin users cannot be created");
      }

      const useCase = new CreateUserUseCase(this.userRepository);
      const result = await useCase.execute({ name, username, password });

      return response.json(result);
    } catch (error: any) {
      console.log("ERROR", error);
      logger.error(error.stack);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
