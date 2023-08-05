const { User } = require('../models');

module.exports = {
  create: (userObj) => User.create(userObj),
  updateById: (id, objectToUpdate) => User.findByIdAndUpdate({ _id: id }, objectToUpdate, { new: true }),
  deleteById: (id) => User.findOneAndDelete(id),
  getById: (id) => User.findById(id),
  find: () => User.find()
};
