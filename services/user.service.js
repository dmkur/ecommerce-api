const { User } = require("../models");

module.exports = {
  create: (userObject) => User.create(userObject),
};
