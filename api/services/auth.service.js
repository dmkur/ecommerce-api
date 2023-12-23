const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { PAS_SEC, JWT_SEC, ACCESS_TOKEN_LIFETIME } = require("../config/config");
const { User } = require("../db");
const { statusCodeENUM } = require("../constants");
const { CustomErrorHandler } = require("../errors");
const { Auth } = require("../db");

module.exports = {
  hashedPasswords: (password) => CryptoJS.AES.encrypt(password, PAS_SEC),
  unhashedPasswords: (password) =>
    CryptoJS.AES.decrypt(password, PAS_SEC).toString(CryptoJS.enc.Utf8),
  findUser: (username) => User.findOne(username),
  // у payload додаємо два праметри, щоб потім їх використати при аунтифікації юзера і його прав
  createAuthTokens: (id, isAdmin) =>
    jwt.sign({ id, isAdmin }, JWT_SEC, { expiresIn: ACCESS_TOKEN_LIFETIME }),
  checkToken: (token) => {
    try {
      return jwt.verify(token, JWT_SEC);
    } catch (e) {
      throw new CustomErrorHandler(
        "Token is not valid",
        statusCodeENUM.UNAUTHORIZED,
      );
    }
  },

  findOneWithUser: (access_token) =>
    Auth.findOne({ access_token }).populate("User"),
};
