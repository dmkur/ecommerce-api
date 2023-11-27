const { constants, statusCodeENUM } = require('../constants');
const { CustomErrorHandler } = require('../errors');
const { authService } = require('../services');

module.exports = {
  checkIsAccessToken: (req, res, next) => {
    try {
      const token = req.get(constants.AUTHORIZATION);
      if (!token) return next(new CustomErrorHandler('No token', statusCodeENUM.UNAUTHORIZED));

      req.user = authService.checkToken(token);

      next();
    } catch (e) {
      next(e);
    }
  },
  checkIsRefreshToken:(req,res, next) => {
    try {
      const {refresh_token} = req.body;

      if(!refresh_token) return next(new CustomErrorHandler('Token is absent',statusCodeENUM.UNAUTHORIZED))


      next()
    }catch (e) {
      next(e)
    }
  },
  checkAuthorizationOrIsAdmin: (req, res, next) => {
    try {
      if (req.user.id.id === req.params.id || req.user.id.isAdmin) {
        next();
      } else {
        return next(new CustomErrorHandler("You're not allowed todo that", statusCodeENUM.CONFLICT));
      }
    } catch (e) {
      next(e);
    }
  },
  checkIsAdmin: (req, res, next) => {
    try {
      if (req.user.id.isAdmin) {
        next();
      } else {
        return next(new CustomErrorHandler("You're not allowed todo that", statusCodeENUM.CONFLICT));
      }
    } catch (e) {
      next(e);
    }
  }
};
