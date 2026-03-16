import { Inject, Injectable } from "@nestjs/common";

import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findUsers() {
    const users = await this.userRepository.findUsers();

    return users;
  }
}