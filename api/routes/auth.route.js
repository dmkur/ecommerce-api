const { Router } = require('express');
const { authController } = require('../controllers');
const { userMddlwr } = require('../middlewares');

const authRouter = Router();

authRouter.post(
  '/login',
  userMddlwr.getUserByDynemicParams(),
  authController.login
);

module.exports = authRouter;
