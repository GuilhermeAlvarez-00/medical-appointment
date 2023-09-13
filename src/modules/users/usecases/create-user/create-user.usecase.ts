import { CustomError } from "../../../../errors/custom-error";
import { ParamiterRequiredError } from "../../../../errors/paramiter-required.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async execute(data: UserRequest) {
    if (!data.name || !data.username || !data.password) {
      throw new CustomError(
        "Name, username and password are required",
        400,
        "REQUIRED_PARAMS"
      );
    }

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const passwordHashed = await this.passwordCrypto.hash(data.password);
    data.password = passwordHashed;

    const user = User.create(data);

    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
