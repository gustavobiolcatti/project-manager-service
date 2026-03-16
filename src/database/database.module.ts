import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import * as ProjectManagerDb from "project-manager-entities/project-manager-db";

@Module({
  imports: [
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
      }),
      async dataSourceFactory(options) {
	       if (!options) {
	         throw new Error('Invalid options passed');
	       }

	       return addTransactionalDataSource(new DataSource(options));
	     },
    }),
  ],
})
export class DatabaseModule {}