import jwt from 'jsonwebtoken';

import salt from './salt';

const jwtoken = (id: number, isAdmin: boolean): string => {
  const token = jwt.sign({ id, isAdmin }, salt, {
    expiresIn: '15d',
    algorithm: 'HS256',
  })
  return token;
}

export default jwtoken;