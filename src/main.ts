import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';

import {
  StorageDriver,
  initializeTransactionalContext,
} from 'typeorm-transactional';

import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext({
    storageDriver: StorageDriver.AUTO,
  });

  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(`Application is running on port: ${port}`);
}
bootstrap();
