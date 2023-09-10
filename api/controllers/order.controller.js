const { orderService } = require('../services');
const { statusCode } = require('../constants');

module.exports = {
  create: async (req, res, next) => {
    try {
      const newOrder = await orderService.create(req.body);

      res.status(statusCode.CREATE).json(newOrder);
    } catch (e) {
      next(e);
    }
  },

  updateById: async (req, res, next) => {
    try {
      const updatedOrder = await orderService.updateById(req.params.id, req.body);

      res.json(updatedOrder);
    } catch (e) {
      next(e);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      await orderService.deleteById(req.params.id);

      res.json('order has been deleted!');
    } catch (e) {
      next(e);
    }
  },
  getUserOrdersById: async (req, res, next) => {
    try {
      const order = await orderService.find({ userId: req.params.id });

      res.json(order);
    } catch (e) {
      next(e);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const orders = await orderService.find();

      res.json(orders);
    } catch (e) {
      next(e);
    }
  },
  income: async (req, res, next) => {
    try {
      const productId = req.query.pid;
      console.log(productId)
      const data = await orderService.stats(productId);

      res.json(data);
    } catch (e) {
      next(e);
    }
  }
};
