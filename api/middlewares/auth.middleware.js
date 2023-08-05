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
  // checkTokenAndAuth: (req, res, next) => {
  //   try {
  //
  //
  //     next();
  //   } catch (e) {
  //     next(e);
  //   }
  // },
};
