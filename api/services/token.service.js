const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CustomErrorHandler } = require('../errors');
const { statusCodeENUM, tokenTypeENUM } = require('../constants');
const {
  ACCESS_SECRET_WORD,
  ACCESS_TOKEN_LIFETIME,
  REFRESH_SECRET_WORD,
  REFRESH_TOKEN_LIFETIME,
} = require('../config/config');
const { Auth } = require('../db');

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  comparePassword: async (password, hashedPassword) => {
    const isPasswordSame = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordSame) {
      throw new CustomErrorHandler(
        'Wrong credentials',
        statusCodeENUM.BAD_REQUEST,
      );
    }
  },
  createAuthTokens: (payload = {}) => {
    const access_token = jwt.sign(payload, ACCESS_SECRET_WORD, {
      expiresIn: ACCESS_TOKEN_LIFETIME,
    });
    const refresh_token = jwt.sign(payload, REFRESH_SECRET_WORD, {
      expiresIn: REFRESH_TOKEN_LIFETIME,
    });

    return { access_token, refresh_token };
  },
  checkToken: (token, tokenType = tokenTypeENUM.ACCESS_TYPE) => {
    try {
      const secretWord = tokenType === tokenTypeENUM.ACCESS_TYPE
        ? ACCESS_SECRET_WORD
        : REFRESH_SECRET_WORD;

      return jwt.verify(token, secretWord);
    } catch (e) {
      throw new CustomErrorHandler(
        'Token isn`t valid',
        statusCodeENUM.UNAUTHORIZED,
      );
    }
  },
  saveTokens: (tokenInfo) => Auth.create(tokenInfo),
};
