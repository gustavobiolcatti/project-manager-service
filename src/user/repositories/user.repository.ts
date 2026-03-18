import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


import { User } from "project-manager-entities/project-manager-db";


@Injectable()
export class UserRepository {
  private readonly DEFAULT_LOG_OBJECT = {
    className: UserRepository.name,
    dbName: process.env.DB_NAME,
  };

  constructor(
      @InjectRepository(User, process.env.DB_NAME)
      private readonly userRepository: Repository<User>,
  ) {}

  createUserInstance(user: Partial<User>): User {
    return this.userRepository.create(user);
  }

  async saveUser(user: User): Promise<string> {
    try {
      const savedUser = await this.userRepository.save(user);

      return savedUser.id;
    } catch (error) {
      console.error({
        ...this.DEFAULT_LOG_OBJECT,
        function: this.saveUser.name,
        error,
      })

      throw error;
    }
  }

  async findUsers(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.error({
        ...this.DEFAULT_LOG_OBJECT,
        function: this.findUsers.name,
        error,
      })

      throw error;
    }
  }

  async getUserForLogin(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        select: ['name', 'email', 'password'], 
        where: { email },
      });
    } catch (error) {
      console.error({
        ...this.DEFAULT_LOG_OBJECT,
        function: this.getUserForLogin.name,
        error,
      })

      throw error;
    }
  }
}