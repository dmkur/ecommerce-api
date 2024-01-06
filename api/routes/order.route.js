const { Router } = require('express');
const { authMddlwr } = require('../middlewares');
const { orderController } = require('../controllers');

const orderRouter = Router();

// CREATE ORDER
orderRouter.post(
  '/',
  authMddlwr.checkIsAccessToken,
  orderController.create
);

// UPDATE
orderRouter.put(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  orderController.updateById
);

// DELETE
orderRouter.delete(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  orderController.deleteById
);

// GET USER Orders
orderRouter.get(
  '/find/:userId',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthOrIsAdmin,
  orderController.getUserOrdersById
);

// GET ALL
orderRouter.get(
  '/',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  orderController.getAll
);

// get monthly income
orderRouter.get(
  '/income',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  orderController.income
);

module.exports = orderRouter;
