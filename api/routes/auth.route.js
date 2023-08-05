const { Router } = require('express');
const { authController } = require('../controllers');

const authRouter = Router();

// REGISTER
authRouter.post('/register', authController.register);

// LOGIN
authRouter.post('/login', authController.login);

module.exports = authRouter;
