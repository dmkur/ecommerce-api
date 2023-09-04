const { Router } = require('express');
const { userController } = require('../controllers');
const { authMddlwr } = require('../middlewares');

const userRouter = Router();

// UPDATE
userRouter.put(
  '/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.checkAuthorization,
  userController.updateById
);

// DELETE
userRouter.delete(
  '/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.checkAuthorization,
  userController.deleteById
);

// GET BY ID
userRouter.get(
  '/find/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  userController.getById
);

// GET ALL
userRouter.get(
  '/',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  userController.getAll
);

// GET USER STATS
userRouter.get(
  '/stats',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  userController.getUserStats
);

module.exports = userRouter;
