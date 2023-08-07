const { Cart } = require('../models');

module.exports = {
  create: (CartObj) => Cart.create(CartObj),
  updateById: (id, objectToUpdate) => Cart.findByIdAndUpdate({ _id: id }, objectToUpdate, { new: true }),
  deleteById: (id) => Cart.findOneAndDelete(id),
  getById: (id) => Cart.findOne(id),
  find: (filter = {}) => Cart.find(filter)
};
