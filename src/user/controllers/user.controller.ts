import { Controller, Get, Inject } from "@nestjs/common";

import { UserService } from "../services/user.service";

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
}
