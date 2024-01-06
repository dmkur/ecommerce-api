const { Product } = require('../db');

module.exports = {
  create: (productObj) => Product.create(productObj),
  updateById: (id, objectToUpdate) => Product.findByIdAndUpdate({ _id: id }, objectToUpdate, { new: true }),
  deleteById: (id) => Product.findByIdAndDelete(id),
  getById: (id) => Product.findById(id),
  find: (filter = {}) => Product.find(filter)
};
