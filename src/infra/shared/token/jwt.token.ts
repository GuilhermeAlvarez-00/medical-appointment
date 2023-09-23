import { sign, verify } from "jsonwebtoken";
import { createHmac } from "crypto";

import { User } from "../../../modules/users/entities/user.entity";
import { IToken, TokenUser } from "./token";

export class JWTToken implements IToken {
  private ENV_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

  private HASH_SECRET_KEY = createHmac("sha256", this.ENV_SECRET_KEY).digest(
    "base64"
  );

  create({ username, isAdmin, id }: User): string {
    const token = sign(
      {
        user: {
          id,
          username,
          isAdmin,
        },
      },
      this.HASH_SECRET_KEY,
      {
        subject: id,
        expiresIn: "15min",
      }
    );

    return token;
  }

  validate(token: string): TokenUser | null {
    try {
      return verify(token, this.HASH_SECRET_KEY) as TokenUser;
    } catch (error) {
      return null;
    }
  }
}
