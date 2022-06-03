type NodeEnv = 'dev' | 'test' | 'prod';

const nodeEnv = (): NodeEnv => {
  const result = process.env.NODE_ENV;
  const vaild = result === 'dev' || result === 'test' || result === 'prod';
  if (!vaild) {
    const error =
      'The value of env variable is not vaild. Please set it to `dev`, `test`' +
      'or `prod`';
    throw new Error(error);
  }
  return result;
};

export default nodeEnv();
