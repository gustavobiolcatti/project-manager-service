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

  async getUserByParams(
    params: Partial<Omit<User, 'hashPassword'>>
  ): Promise<User | null> {
    try {
      return this.userRepository.findOneBy(params);
    } catch (error) {
      console.error({
        ...this.DEFAULT_LOG_OBJECT,
        function: this.getUserByParams.name,
        error,
      })

      throw error;
    }
  }
}