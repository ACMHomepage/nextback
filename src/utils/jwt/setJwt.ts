import { Response } from 'express';

import * as httpOnlyCookie from 'utils/httpOnlyCookie';

import genJwt from './genJwt';
import { JwtObject } from './type';

/**
 * Set the jwt to response.
 * 
 * @param res The response object, where we can set the http-only cookie.
 * @param jwtObject The object of jwt.
 */
const setJwt = (res: Response, jwtObject?: JwtObject) => {
  if (jwtObject === undefined) {
    httpOnlyCookie.set(res, 'jwt', '');
  } else {
    httpOnlyCookie.set(res, 'jwt', genJwt(jwtObject));
  }
}

export default setJwt;