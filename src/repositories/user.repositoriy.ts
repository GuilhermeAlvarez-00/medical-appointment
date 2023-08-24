import { User } from "../entities/user.entity";

export class UserRepository {
  users: User[];
  private static instance: UserRepository;

  constructor() {
    this.users = [];
  }

  static getInstance() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  }
  async findByUsername(username: string) {
    return this.users.find((item) => item.username === username);
  }

  async save(user: User) {
    this.users.push(user);
    return user;
  }
}
