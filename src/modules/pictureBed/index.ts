import { Module } from '@nestjs/common';
import { mkdirSync } from 'fs';
import { join } from 'path';

import { PictureBedController } from './pictureBed.controller';
import { PictureBedService } from './pictureBed.service';

@Module({
  controllers: [PictureBedController],
  providers: [PictureBedService],
})
export class PictureBedModule { }
