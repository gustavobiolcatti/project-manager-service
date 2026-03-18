import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as argon2 from 'argon2';

import { UserRepository } from "user/repositories/user.repository";

import { LoginDTO } from "auth/models/login.dto";

import { User } from "project-manager-entities/project-manager-db";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async login({
    email, 
    password
  }: LoginDTO): Promise<string> {
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

    await this.validateUserPassword(user, password);

    const token = this.generateToken(user);

    return token;
  }

  private async validateUserPassword(user: User, passwordAttempt: string): Promise<void> {
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
    };
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}