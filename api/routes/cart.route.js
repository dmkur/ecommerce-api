const { Router } = require('express');
const { authMddlwr } = require('../middlewares');
const { cartController } = require('../controllers');

const cartRouter = Router();

// CREATE
cartRouter.post(
  '/',
  authMddlwr.checkAccessToken,
  cartController.create
);

// UPDATE
cartRouter.put(
  '/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.checkAuthorization,
  cartController.updateById
);

// DELETE
cartRouter.delete(
  '/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.checkAuthorization,
  cartController.deleteById
);

// GET USER CART

cartRouter.get(
  '/find/:userId',
  authMddlwr.checkAccessToken,
  authMddlwr.checkAuthorization,
  cartController.getCartByUserId
);

// GET ALL
cartRouter.get(
  '/',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  cartController.getAll
);

module.exports = cartRouter;
