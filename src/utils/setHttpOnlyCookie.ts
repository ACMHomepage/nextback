import { Request } from "express"

const setHttpOnlyCookie = (req: Request, name: string, val: string) => {
  req.res?.cookie(name, val, { httpOnly: true });
}

export default setHttpOnlyCookie;