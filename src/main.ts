import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  await app.listen(PORT, () => {
    Logger.verbose(`Server is running on port ${PORT}`);
  });
}

await bootstrap();
