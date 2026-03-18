import { Inject, Injectable } from "@nestjs/common";

import { UserRepository } from "user/repositories/user.repository";
import { CreateUserDto } from "user/dtos/create-user.dto";

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

  async createUser(userData: CreateUserDto): Promise<string> {
    const userInstance = this.userRepository.createUserInstance(userData);

    const createdUser = await this.userRepository.saveUser(userInstance);

    return createdUser;
  }
}