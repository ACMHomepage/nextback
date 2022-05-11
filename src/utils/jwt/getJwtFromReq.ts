import { Request } from "express";

const getJwtFromReq = (req: Request): string => {
  const jwt = req.cookies?.jwt;

  if (jwt === undefined) {
    throw new Error(
      'No jwt in cookie. Are you sure that you are signed in?'
    );
  }

  return jwt;
}

export default getJwtFromReq;