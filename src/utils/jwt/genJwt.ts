import * as jwt from 'jsonwebtoken';

import salt from 'utils/salt';

import { JwtObject } from './type';

const genJwt = (jwtObjectj: JwtObject): string => {
  const token = jwt.sign(jwtObjectj, salt, {
    expiresIn: '15d',
    algorithm: 'HS256',
  })
  return token;
}

export default genJwt;