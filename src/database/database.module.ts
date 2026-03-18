import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import * as ProjectManagerDb from "project-manager-entities/project-manager-db";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.getOrThrow<'postgres'>('database.type'),
        host: config.getOrThrow<string>('database.host'),
        port: config.getOrThrow<number>('database.port'),
        username: config.getOrThrow<string>('database.username'),
        password: config.getOrThrow<string>('database.password'),
        database: config.getOrThrow<string>('database.name'),
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