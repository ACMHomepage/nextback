import * as jwt from 'jsonwebtoken';

import salt from 'utils/salt';

import { JwtObject } from './type';

const genJwt = (id: number, isAdmin: boolean): string => {
  const tokenObject: JwtObject = { id, isAdmin };

  const token = jwt.sign(tokenObject, salt, {
    expiresIn: '15d',
    algorithm: 'HS256',
  })
  return token;
}

export default genJwt;