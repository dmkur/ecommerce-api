const { productService } = require('../services');
const { statusCode } = require('../constants');
const { Product } = require('../models');

module.exports = {
  create: async (req, res, next) => {
    try {
      const newProduct = await productService.create(req.body);

      res.status(statusCode.CREATE).json(newProduct);
    } catch (e) {
      next(e);
    }
  },

  updateById: async (req, res, next) => {
    try {
      const updatedProduct = await productService.updateById(req.params.id, req.body);

      res.json(updatedProduct);
    } catch (e) {
      next(e);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      await productService.deleteById(req.params.id);

      res.json('product has been deleted!');
    } catch (e) {
      next(e);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const product = await productService.getById(req.params.id);

      res.json(product);
    } catch (e) {
      next(e);
    }
  },
  getAll: async (req, res, next) => {
    try {
      let product;
      const qNew = req.query.new;
      const qCategory = req.query.category;

      if (qNew) {
        product = await productService.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        // find from query in DB in field categories and return object with this categories
        product = await productService.find({ categories: { $in: [qCategory] } });
      } else {
        product = await productService.find();
      }

      res.json(product);
    } catch (e) {
      next(e);
    }
  },

};
