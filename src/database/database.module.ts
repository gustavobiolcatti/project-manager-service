import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import * as ProjectManagerDb from "project-manager-db";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV == 'LOCAL' ? '.local.env' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      name: process.env.DB_NAME,
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOSTNAME,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ProjectManagerDb as any,
        synchronize: false,
      })
    }),
  ],
})
export class DatabaseModule {}