import { Logger, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const env: string | undefined = process.env.NODE_ENV;
  const defaultLogLevels: LogLevel[] = ['error', 'warn', 'log'];
  if (env === 'development') {
    defaultLogLevels.push('debug');
    Logger.log(`⌛ Starting Access Hub in Development Mode`)
  } else {
    Logger.log(`⌛ Starting Access Hub in Production Mode`)
  }


  const app = await NestFactory.create(AppModule, {
    logger: defaultLogLevels,
    cors: {
      origin: [`${process.env.ORIGIN_URL}`],
      credentials: true,
    }
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Access Hub is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
