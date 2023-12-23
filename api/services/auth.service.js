const CryptoJS = require('crypto-js');
const { PAS_SEC } = require('../config/config');

const { Auth } = require('../db');

module.exports = {
  hashedPasswords: (password) => CryptoJS.AES.encrypt(password, PAS_SEC),
  findOneWithUser: (access_token) => Auth.findOne(access_token),
  deleteOneByParams: (filter) => Auth.deleteOne(filter)
};
