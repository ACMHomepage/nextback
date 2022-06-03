import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import baseFolder from 'modules/pictureBed/commons/baseFolder';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(baseFolder, {
    prefix: '/picture-bed',
  });
  await app.listen(8030);
}

bootstrap();
