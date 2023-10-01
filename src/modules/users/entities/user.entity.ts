import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom-error";
import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt";

type IUser = {
  name: string;
  username: string;
  password: string;
};

export class User {
  id: string;
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;

  private constructor(props: IUser) {
    if (!props.name || !props.username || !props.password) {
      throw new CustomError(
        "Name, username and password are required",
        400,
        "REQUIRED_PARAMS"
      );
    }

    this.id = randomUUID();
    this.name = props.name;
    this.username = props.username;
    this.password = props.password;
    this.isAdmin = false;
  }

  static async create(props: IUser) {
    if (!props.password) {
      throw new CustomError(
        "Name, username and password are required",
        400,
        "REQUIRED_PARAMS"
      );
    }

    const bcrypt = new PasswordBcrypt();
    const passwordHashed = await bcrypt.hash(props.password);

    props.password = passwordHashed;

    return new User(props);
  }
}
