const { Router } = require("express");
const { userController } = require("../controllers");

const authRouter = Router();

authRouter.post("/register", userController.createUser);

module.exports = authRouter;
