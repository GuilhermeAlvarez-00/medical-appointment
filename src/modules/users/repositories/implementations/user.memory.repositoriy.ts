import { IUserRepository } from "../user.repository";
import { User } from "../../entities/user.entity";

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

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((item) => item.id === id) as User;
  }

  async save(user: User) {
    this.users.push(user);
    return user;
  }
}
