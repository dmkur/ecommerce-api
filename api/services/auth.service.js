const CryptoJS = require('crypto-js');
const { PAS_SEC } = require('../config/config');

module.exports = {
  hashedPasswords: (password) => CryptoJS.AES.encrypt(password, PAS_SEC)
};
