import * as bcrypt from 'bcrypt';

const check = async (hash: string, password: string): Promise<boolean> => {
  let result = await bcrypt.compare(password, hash);
  return result;
};

export default check;
