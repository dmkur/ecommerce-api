const { User } = require('../models');

module.exports = {
  create: (userObj) => User.create(userObj),
  updateById: (id, objectToUpdate) => User.findByIdAndUpdate({ _id: id }, objectToUpdate, { new: true })
};
