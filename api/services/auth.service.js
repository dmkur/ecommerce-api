const bcrypt = require("bcrypt");
const { Auth } = require("../db");
const { CustomErrorHandler } = require("../errors");
const { statusCodeENUM } = require("../constants");

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  comparePassword: async (password, hashedPassword) => {
    const isPasswordSame = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordSame) {
      throw new CustomErrorHandler(
        "Wrong credentials",
        statusCodeENUM.BAD_REQUEST,
      );
    }
  },
  findOne: (access_token) => Auth.findOne(access_token),
  updateStatus: (id, newData) =>
    Auth.findByIdAndUpdate(id, newData, { new: true }),
  deleteOneByParams: (filter) => Auth.deleteOne(filter),
  deleteMany: (params) => Auth.deleteMany(params),
};
