const { cartService } = require('../services');
const { statusCodeENUM } = require('../constants');

module.exports = {
  create: async (req, res, next) => {
    try {
      const newCart = await cartService.create(req.body);

      res.status(statusCodeENUM.CREATE).json(newCart);
    } catch (e) {
      next(e);
    }
  },

  updateById: async (req, res, next) => {
    try {
      const updatedCart = await cartService.updateById(req.params.id, req.body);

      res.json(updatedCart);
    } catch (e) {
      next(e);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      await cartService.deleteById(req.params.id);

      res.json('cart has been deleted!');
    } catch (e) {
      next(e);
    }
  },
  getCartByUserId: async (req, res, next) => {
    try {
      const cart = await cartService.getById({ userId: req.params.userId });

      res.json(cart);
    } catch (e) {
      next(e);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const cart = await cartService.find();

      res.json(cart);
    } catch (e) {
      next(e);
    }
  },

};
