// import cryptoRandomString from 'crypto-random-string';

/**
 * The const variable `slat` is only used for JWT.
 */
// const salt = cryptoRandomString({
//   length: 64,
//   type: 'base64',
// })

// FIXME! The crypto-random-string is a ESM, and I cannot import it.
const salt = 'BAT-SALT';

export default salt;