const { Router } = require("express");
const { authController } = require("../controllers");
const { userMddlwr, authMddlwr } = require("../middlewares");

const authRouter = Router();

authRouter.post(
  "/login",
  userMddlwr.getUserByDynemicParams(),
  authController.login,
);

authRouter.post(
  "/logout",
  authMddlwr.checkIsAccessToken,
  authController.logout,
);

module.exports = authRouter;
