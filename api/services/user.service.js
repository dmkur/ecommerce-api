const { User } = require('../models');

module.exports = {
  create: (userObj) => User.create(userObj)
};
