import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import pictureBedUrl from 'modules/pictureBed/commons/pictureBedUrl';
import baseFolder from 'modules/pictureBed/commons/baseFolder';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(baseFolder, {
    prefix: pictureBedUrl(),
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  await app.listen(8030);
}

bootstrap();
