const { Router } = require('express');
const { userController } = require('../controllers');
const { authMddlwr } = require('../middlewares');

const userRouter = Router();

userRouter.get(
  '/',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  userController.getAll
);

userRouter.post(
  '/',
  userController.createNewUser
);

userRouter.get(
  '/find/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  userController.getById
);

userRouter.get(
  '/stats',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  userController.getUserStats
);

userRouter.put(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthorizationOrIsAdmin,
  userController.updateById
);

userRouter.delete(
  '/:id',
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkAuthorizationOrIsAdmin,
  userController.deleteById
);

module.exports = userRouter;
