import { User } from "@prisma/client";
import { IUserRepository } from "../user.repository";

export class UserMemoryRepository implements IUserRepository {
  users: User[];
  private static instance: UserMemoryRepository;

  constructor() {
    this.users = [];
  }

  static getInstance() {
    if (!UserMemoryRepository.instance) {
      UserMemoryRepository.instance = new UserMemoryRepository();
    }

    return UserMemoryRepository.instance;
  }
  async findByUsername(username: string) {
    return this.users.find((item) => item.username === username) as User;
  }

  async save(user: User) {
    this.users.push(user);
    return user;
  }
}
