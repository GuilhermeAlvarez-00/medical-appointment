import { Request, Response } from "express";
import { IUserRepository } from "../../repositories/user.repository";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";
import { logger } from "../../../../utils/logger";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";

type BodyRequestProps = {
  username: string;
  password: string;
};

export class AuthenticateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async handle(request: Request, response: Response) {
    logger.info("Authenticating user");
    try {
      const { username, password } = request.body as BodyRequestProps;

      const authenticateUserUseCase = new AuthenticateUserUseCase(
        this.userRepository,
        this.passwordCrypto,
        this.token
      );

      const result = await authenticateUserUseCase.execute(username, password);

      return response.json(result);
    } catch (error: any) {
      logger.error(error.stack);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
