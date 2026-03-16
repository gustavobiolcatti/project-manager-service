import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "project-manager-db";

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

  async findUsers() {
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
}