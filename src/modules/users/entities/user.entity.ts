import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom-error";

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

  static create(props: IUser) {
    return new User(props);
  }
}
