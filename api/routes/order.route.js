const { Router } = require('express');
const { authMddlwr } = require('../middlewares');
const { orderController } = require('../controllers');

const orderRouter = Router();

// CREATE ORDER
orderRouter.post('/', authMddlwr.checkAccessToken, orderController.create);

// UPDATE
orderRouter.put(
  '/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  orderController.updateById
);

// DELETE
orderRouter.delete(
  '/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  orderController.deleteById
);

// GET USER Orders
orderRouter.get(
  '/find/:userId',
  authMddlwr.checkAccessToken,
  orderController.getUserOrderById
);

// GET ALL
orderRouter.get(
  '/',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  orderController.getAll
);

// get monthly income
orderRouter.get(
  '/income',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  orderController.income
);

module.exports = orderRouter;
