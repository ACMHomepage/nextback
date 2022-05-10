import bcrypt from 'bcrypt';

const saltRounds = 16;

const hash = async (password: string): Promise<string> => {
  let result = await bcrypt.hash(password, saltRounds);
  return result;
}

export default hash;