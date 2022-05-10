import { Request } from "express";
import { verify } from "jsonwebtoken";

import salt from "./salt";

const idByJwt = (req: Request): number => {
  let result: number;

  verify(req.cookies.jwt, salt, (err, decoded) => {
    if (err) {
      throw new Error(
        'Cannot verify. Maybe the JWT is too old, or just '
        + 'the JWT is invaild.'
      );
    }
    result = decoded.id;
  })

  return result;
}

export default idByJwt;