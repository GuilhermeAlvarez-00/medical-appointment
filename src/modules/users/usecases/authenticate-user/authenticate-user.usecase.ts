import { CustomError } from "../../../../errors/custom-error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async execute(username: string, password: string) {
    if (!username || !password) {
      throw new CustomError(
        "Username/password are required",
        400,
        "REQUIRED_PARAMS"
      );
    }

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new CustomError(
        "Username/password invalid",
        401,
        "REQUIRED_PARAMS"
      );
    }

    const isPasswordEquals = await this.passwordCrypto.compare(
      password,
      user.password
    );

    if (!isPasswordEquals) {
      throw new CustomError(
        "Username/password invalid",
        401,
        "REQUIRED_PARAMS"
      );
    }

    const token = this.token.create(user);

    return token;
  }
}
