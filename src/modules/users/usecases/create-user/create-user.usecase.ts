import { CustomError } from "../../../../errors/custom-error";
import { ParamiterRequiredError } from "../../../../errors/paramiter-required.error";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserRequest) {
    if (!data.username || !data.password) {
      throw new Error("Username and password are required");
    }

    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const user = User.create(data);

    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
