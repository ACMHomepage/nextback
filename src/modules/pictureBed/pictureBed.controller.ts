import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PictureBedService } from './pictureBed.service';

@Controller('picture-bed')
export class PictureBedController {
  constructor(private readonly picService: PictureBedService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async storeImg(@UploadedFile() file: Express.Multer.File) {
    const filename = await this.picService.storeImg(file);
    return {
      url: '/picture-bed/' + filename,
    };
  }
}
