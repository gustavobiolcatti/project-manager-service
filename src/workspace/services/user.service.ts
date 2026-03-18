import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { UserRepository } from "workspace/repositories/user.repository";

import { User } from "project-manager-entities/project-manager-db";

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserByParams(
    params: Partial<Omit<User, 'hashPassword'>>
  ): Promise<User> {
    const user = await this.userRepository.getUserByParams(params);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}