const bcrypt = require('bcrypt');
const { Auth } = require('../db');
const { CustomErrorHandler } = require('../errors');
const { statusCodeENUM } = require('../constants');

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
  findOneWithUser: (access_token) => Auth.findOne(access_token),
  deleteOneByParams: (filter) => Auth.deleteOne(filter)
};
