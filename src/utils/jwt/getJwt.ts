import { verify } from 'jsonwebtoken';
import { Request } from 'express';

import salt from 'utils/salt';

import { JwtObject } from './type';
import getJwtFromReq from './getJwtFromReq';

/**
 * Get JWT object from a JWT string or a Request object.
 *
 * @param source A JWT string or just a Request object.
 * @returns A JWT object.
 */
const getJwt = (source: string | Request): JwtObject => {
  if (typeof source !== 'string') {
    source = getJwtFromReq(source);
  }
  let jwt: string = source;

  const jwtObject = verify(jwt, salt) as JwtObject;
  return jwtObject;
};

export default getJwt;
