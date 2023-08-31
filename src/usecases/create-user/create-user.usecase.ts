import { User } from "../../entities/user.entity";
import { ParamiterRequiredError } from "../../errors/paramiter-required.error";
import { UserRepository } from "../../repositories/user.repositoriy";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    const userRepository = UserRepository.getInstance();

    if (!data.username || !data.password) {
      throw new Error("Username and password are required");
    }

    const existUser = await userRepository.findByUsername(data.username);

    if (existUser) {
      throw new ParamiterRequiredError("Username already exists", 422);
    }

    const user = User.create(data);

    const userCreated = await userRepository.save(user);
    return userCreated;
  }
}
