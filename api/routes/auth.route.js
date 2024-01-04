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

authRouter.put(
  "/assignAdmin/:id",
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkIsAdmin,
  authMddlwr.checkUserAdminStatus("admin"),
  authController.changeAdminStatus,
);

authRouter.put(
  "/removeAdmin/:id",
  authMddlwr.checkIsAccessToken,
  authMddlwr.checkUserAdminStatus("notAdmin"),
  authController.changeAdminStatus,
);

module.exports = authRouter;
