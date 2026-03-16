import { Body, Controller, Get, HttpStatus, Inject, Post } from "@nestjs/common";

import { UserService } from "../services/user.service";
import { CreateUserDto } from "user/models/createUser.dto";
import { Transactional } from "typeorm-transactional";
import { LoginDTO } from "user/models/login.dto";

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get()
  async getUsers() {
    return await this.userService.findUsers();
  }

  @Post('/register')
  @Transactional({ connectionName: process.env.DB_NAME })
  async createUser(
    @Body() 
    userData: CreateUserDto
  ) {
    const createdUserId = await this.userService.createUser(userData);

    return { 
      status: HttpStatus.CREATED, 
      data: {
        userId: createdUserId
      }
    };
  }

  @Post('/login')
  async login(
    @Body()
    loginData: LoginDTO
  ) {
    const user = await this.userService.login(loginData);

    return { 
      status: HttpStatus.OK,
      data: {
        name: user?.name,
        email: user?.email,
      }
    };
  }
}
