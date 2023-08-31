import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../repositories/user.repository";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";

export class CreateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}
  async handle(request: Request, response: Response) {
    logger.info("User being created");
    try {
      const { name, username, password } = request.body;

      if (request.body.isAdmin) {
        throw new Error("Admin users cannot be created");
      }

      const useCase = new CreateUserUseCase(
        this.userRepository,
        this.passwordCrypto
      );
      const result = await useCase.execute({ name, username, password });

      return response.json(result);
    } catch (error: any) {
      logger.error(error.stack);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
