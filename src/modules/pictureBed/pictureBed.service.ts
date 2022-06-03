import { Injectable, Options } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as crypto from 'crypto';

import baseFolder from './commons/baseFolder';

@Injectable()
export class PictureBedService {
  async storeImg(file: Express.Multer.File) {
    const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');
    const filename = `${hash}.${file.originalname.split('.').at(-1)}`;
    console.info('Write file:', filename);
    await writeFile(
      join(baseFolder, filename),
      file.buffer,
    );
    return filename;
  }
}
