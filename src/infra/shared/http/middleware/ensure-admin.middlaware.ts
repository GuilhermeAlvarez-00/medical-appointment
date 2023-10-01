import { NextFunction, Request, Response } from "express";
import { UserPrismaRepository } from "../../../../modules/users/repositories/implementations/user.prisma.repository";

export const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = new UserPrismaRepository();

  const user = await userRepository.findById(req.body.userId);

  if (!user) {
    return res.status(400).json({ message: "User not exist" });
  }

  if (!user?.isAdmin) {
    return res.status(401).json({ message: "User not admin" });
  }

  return next();
};
