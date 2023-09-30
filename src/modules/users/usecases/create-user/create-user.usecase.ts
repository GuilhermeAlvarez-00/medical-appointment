import { CustomError } from "../../../../errors/custom-error";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

export type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserRequest) {
    const existUser = await this.userRepository.findByUsername(data.username);

    if (existUser) {
      throw new CustomError(
        "Username already exists",
        400,
        "USER_EXISTS_ERROR"
      );
    }

    const user = await User.create(data);

    const userCreated = await this.userRepository.save(user);
    return userCreated;
  }
}
