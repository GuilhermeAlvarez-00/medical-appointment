import { Request, Response } from "express";
import { IUserRepository } from "../../repositories/user.repository";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";
import { logger } from "../../../../utils/logger";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";

type BodyRequestProps = {
  username: string;
  password: string;
};

export class AuthenticateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async handle(request: Request, response: Response) {
    logger.info("Authenticating user");
    try {
      const { username, password } = request.body as BodyRequestProps;

      const authenticateUserUseCase = new AuthenticateUserUseCase(
        this.userRepository,
        this.passwordCrypto
      );

      const result = await authenticateUserUseCase.execute(username, password);

      return response.json(result);
    } catch (error: any) {
      logger.error(error.stack);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
