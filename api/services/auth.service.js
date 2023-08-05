const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { PAS_SEC, JWT_SEC, ACCESS_TOKEN_LIFETIME } = require('../config/config');
const { User } = require('../models');
const { statusCode } = require('../constants');
const { CustomErrorHandler } = require('../errors');

module.exports = {
  hashedPasswords: (password) => CryptoJS.AES.encrypt(password, PAS_SEC),
  unhashedPasswords: (password) => CryptoJS.AES.decrypt(password, PAS_SEC).toString(CryptoJS.enc.Utf8),
  findUser: (username) => User.findOne(username),
  // у payload додаємо два праметри, щоб потім їх використати при аунтифікації юзера і його прав
  createAuthTokens: (id, isAdmin) => jwt.sign({ id, isAdmin }, JWT_SEC, { expiresIn: ACCESS_TOKEN_LIFETIME }),
  checkToken: (token) => {
    try {
      return jwt.verify(token, JWT_SEC);
    } catch (e) {
      throw new CustomErrorHandler('Token is not valid', statusCode.UNAUTHORIZED);
    }
  }
};
