const { constants, statusCode } = require('../constants');
const { CustomErrorHandler } = require('../errors');
const { authService } = require('../services');

module.exports = {
  checkAccessToken: (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      if (!token) return next(new CustomErrorHandler('No token', statusCode.UNAUTHORIZED));

      req.user = authService.checkToken(token);

      next();
    } catch (e) {
      next(e);
    }
  },
  checkAuthorization: (req, res, next) => {
    try {
      console.log(req.user.id.id === req.params.id);
      console.log(req.user.id.isAdmin);
      if (req.user.id.id === req.params.id || req.user.id.isAdmin) {
        next();
      } else {
        return next(new CustomErrorHandler("You're not allowed todo that", statusCode.CONFLICT));
      }
    } catch (e) {
      next(e);
    }
  },
  verifyAdmin: (req, res, next) => {
    try {
      if (req.user.id.isAdmin) {
        next();
      } else {
        return next(new CustomErrorHandler("You're not allowed todo that", statusCode.CONFLICT));
      }
    } catch (e) {
      next(e);
    }
  }
};
