import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

import { UserRepository } from "user/repositories/user.repository";
import { CreateUserDto } from "user/models/createUser.dto";
import { LoginDTO } from "user/models/login.dto";
import { User } from "project-manager-entities/project-manager-db";

import * as argon2 from 'argon2';


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

  async login({
    email, 
    password
  }: LoginDTO): Promise<User | null> {
    const user = await this.userRepository.getUserForLogin(email);

    if (!user) {
      console.error(`User not found. E-mail: ${email}`, {
        function: this.login.name,
        data: {
          email,
        },
      });

      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.validateUserPassword(user, password);

    return isPasswordValid ? user : null;
  }

  private async validateUserPassword(user: User, passwordAttempt: string): Promise<boolean> {
    const isPasswordValid = await argon2.verify(user.password, passwordAttempt);

    if (!isPasswordValid) {
      console.error(`Invalid password. E-mail: ${user.email}`, {
        function: this.validateUserPassword.name,
        data: {
          email: user.email,
          passwordAttempt,
        },
      });

      throw new UnauthorizedException('Invalid password');
    }

    return true;
  }
}