import { 
  Body, 
  Controller, 
  Get, 
  Headers, 
  HttpStatus, 
  Inject, 
  Post 
} from "@nestjs/common";
import { Transactional } from "typeorm-transactional";

import { UserService } from "user/services/user.service";
import { CreateUserDto } from "user/dtos/create-user.dto";
import { DefaultReturnDto } from "shared/dtos/default-return.dto";

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
    @Headers() _header: Record<string, string>,
    @Body() userData: CreateUserDto
  ): Promise<DefaultReturnDto> {
    const createdUserId = await this.userService.createUser(userData);

    return { 
      status: HttpStatus.CREATED, 
      message: 'User created successfully',
      data: {
        userId: createdUserId
      }
    };
  }
}
