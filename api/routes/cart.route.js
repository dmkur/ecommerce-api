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
  authMddlwr.checkAuthorizationOrIsAdmin,
  cartController.updateById
);

// DELETE
cartRouter.delete(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthorizationOrIsAdmin,
  cartController.deleteById
);

// GET USER CART

cartRouter.get(
  '/find/:userId',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthorizationOrIsAdmin,
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
