import { NextFunction, Request, Response } from "express";
import { JWTToken } from "../../token/jwt.token";

export const ensureAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    return res.status(401).json({ message: "Token is missing!" });
  }

  const [, token] = headerAuth.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Token is missing!" });
  }

  const isTokenValid = new JWTToken().validate(token);

  if (isTokenValid) {
    req.userId = isTokenValid.sub;
    return next();
  }

  return res.status(401).json({
    message: "Token invalid",
  });
};
