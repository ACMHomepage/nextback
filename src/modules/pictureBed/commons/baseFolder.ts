import { mkdirSync } from 'fs';
import { join } from 'path';

import nodeEnv from "utils/nodeEnv";

let baseFolder: string;
switch (nodeEnv) {
  case 'dev':
  case 'test':
    baseFolder = join(__dirname, 'public', 'pictrue-bed');
    break;
  case 'prod':
    baseFolder = join('public', 'picture-bed');
    break;
}

console.info('Make baseFolder:', baseFolder);
mkdirSync(baseFolder, { recursive: true });

export default baseFolder;