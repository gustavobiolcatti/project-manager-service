import { Body, Controller, HttpStatus, Inject, Post } from "@nestjs/common";

import { LoginDTO } from "auth/models/login.dto";
import { AuthService } from "auth/services/auth.service";

@Controller('auth')
export class AuthController {
  constructor (
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async login(
    @Body()
    loginData: LoginDTO
  ) {
    const token = await this.authService.login(loginData);

    return { 
      status: HttpStatus.OK,
      data: {
        token
      }
    };
  }
}