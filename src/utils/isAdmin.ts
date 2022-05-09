import { Request } from "express";
import { verify } from "jsonwebtoken";

import salt from "./salt";

const isAdmin = (req: Request): boolean => {
  let result: boolean;

  verify(req.cookies.jwt, salt, (err, decoded) => {
    if (err) {
      throw new Error(
        'Cannot verify. Maybe the JWT is too old, or just '
        + 'the JWT is invaild.'
      );
    }
    if (decoded.isAdmin === true) {
      result = true;
    } else {
      result = false;
    }
  })

  return result;
}

export default isAdmin;