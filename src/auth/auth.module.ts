import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "user/user.module";
import { AuthController } from "auth/controllers/auth.controller";
import { AuthService } from "auth/services/auth.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('auth.jwtSecret'),
        signOptions: {
          expiresIn: config.getOrThrow<string>('auth.jwtExpiresIn') as any,
        },
      }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}