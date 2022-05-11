import { Response } from "express"

const setHttpOnlyCookie = (res: Response, name: string, val: string) => {
  res.cookie(name, val, { httpOnly: true });
}

export default setHttpOnlyCookie;