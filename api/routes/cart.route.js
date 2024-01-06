const { Router } = require('express');
const { authMddlwr } = require('../middlewares');
const { cartController } = require('../controllers');

const cartRouter = Router();

// CREATE
cartRouter.post(
  '/',
  authMddlwr.checkIsAccessToken,
  cartController.create
);

// UPDATE
cartRouter.put(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthOrIsAdmin,
  cartController.updateById
);

// DELETE
cartRouter.delete(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthOrIsAdmin,
  cartController.deleteById
);

// GET USER CART

cartRouter.get(
  '/find/:userId',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthOrIsAdmin,
  cartController.getCartByUserId
);

// GET ALL
cartRouter.get(
  '/',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  cartController.getAll
);

module.exports = cartRouter;
