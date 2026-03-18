import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';

import { DatabaseModule } from 'database/database.module';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { WorkspaceModule } from 'workspace/workspace.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'LOCAL' ? '.local.env' : '.env',
      isGlobal: true,
      load: [authConfig, databaseConfig],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
