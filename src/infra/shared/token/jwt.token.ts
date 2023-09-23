import { sign, verify } from "jsonwebtoken";
import { createHmac } from "crypto";

import { User } from "../../../modules/users/entities/user.entity";
import { IToken } from "./token";

export class JWTToken implements IToken {
  private ENV_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

  private HASH_SECRET_KEY = createHmac("sha256", this.ENV_SECRET_KEY).digest(
    "base64"
  );

  create({ username, isAdmin }: User): string {
    const token = sign(
      {
        user: {
          username,
          isAdmin,
        },
      },
      this.HASH_SECRET_KEY,
      {
        expiresIn: "1min",
      }
    );

    return token;
  }

  validate(token: string): boolean {
    try {
      verify(token, this.HASH_SECRET_KEY);

      return true;
    } catch (error) {
      return false;
    }
  }
}
