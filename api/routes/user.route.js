const { Router } = require('express');
const { userController } = require('../controllers');
const { authMddlwr } = require('../middlewares');

const userRouter = Router();

// UPDATE
userRouter.put(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthorizationOrIsAdmin,
  userController.updateById
);

// DELETE
userRouter.delete(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthorizationOrIsAdmin,
  userController.deleteById
);

// GET BY ID
userRouter.get(
  '/find/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  userController.getById
);

// GET ALL
userRouter.get(
  '/',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  userController.getAll
);

// GET USER STATS
userRouter.get(
  '/stats',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  userController.getUserStats
);

module.exports = userRouter;
