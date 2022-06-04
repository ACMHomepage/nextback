import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PictureBedService } from './pictureBed.service';
import pictureBedUrl from './commons/pictureBedUrl';

@Controller({ path: 'picture-bed', version: '1' })
export class PictureBedController {
  constructor(private readonly picService: PictureBedService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async storeImg(@UploadedFile() file: Express.Multer.File) {
    const filename = await this.picService.storeImg(file);
    return {
      url: pictureBedUrl(filename),
    };
  }
}
