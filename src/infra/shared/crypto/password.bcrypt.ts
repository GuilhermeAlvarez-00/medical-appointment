import { IPasswordCrypto } from "./password.crypto";
import bcrypt from "bcryptjs";

export class PasswordBcrypt implements IPasswordCrypto {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  compare(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
