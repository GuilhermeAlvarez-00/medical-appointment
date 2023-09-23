import { IUserRepository } from "../user.repository";
import { prismaClient } from "../../../../infra/database/prisma.config";
import { User } from "../../entities/user.entity";

export class UserPrismaRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });

    return user || undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return user || undefined;
  }

  async save(data: User): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        password: data.password,
        username: data.username,
      },
    });

    return user;
  }
}
