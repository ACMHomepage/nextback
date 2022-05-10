import { randomBytes } from 'crypto';

/**
 * The const variable `salt` is **only** used for JWT.
 */
const salt = randomBytes(64).toString('base64');

export default salt;