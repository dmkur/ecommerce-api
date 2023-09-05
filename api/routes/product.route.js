const { Router } = require('express');
const { authMddlwr } = require('../middlewares');
const { productController } = require('../controllers');

const productRouter = Router();

// CREATE
productRouter.post(
  '/',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  productController.create
);

// UPDATE
productRouter.put(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  productController.updateById
);

// DELETE
productRouter.delete(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  productController.deleteById
);

// GET PRODUCT BY ID
productRouter.get(
  '/find/:id',
  productController.getProductById
);

// GET ALL
productRouter.get(
  '/',
  productController.getAll
);

module.exports = productRouter;
