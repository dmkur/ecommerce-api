const { constants, statusCodeENUM } = require('../constants');
const { CustomErrorHandler } = require('../errors');
const { authService, tokenService } = require('../services');

module.exports = {
  checkIsAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get(constants.AUTHORIZATION);

      if (!access_token) {
        return next(
          new CustomErrorHandler('No token', statusCodeENUM.UNAUTHORIZED),
        );
      }

      tokenService.checkToken(access_token);

      const tokenInfo = await authService.findOneWithUser({ access_token });

      if (!tokenInfo) {
        return next(
          new CustomErrorHandler('Not Found', statusCodeENUM.UNAUTHORIZED),
        );
      }
      req.tokenInfo = tokenInfo;

      next();
    } catch (e) {
      next(e);
    }
  },
  checkIsRefreshToken: (req, res, next) => {
    try {
      const { refresh_token } = req.body;

      if (!refresh_token) {
        return next(
          new CustomErrorHandler(
            'Token is absent',
            statusCodeENUM.UNAUTHORIZED,
          ),
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkAuthOrIsAdmin: (req, res, next) => {
    try {
      if (req.tokenInfo.user === req.params.id || req.tokenInfo.isAdmin) {
        next();
      } else {
        return next(
          new CustomErrorHandler(
            "You're not allowed todo that",
            statusCodeENUM.CONFLICT,
          ),
        );
      }
    } catch (e) {
      next(e);
    }
  },
  checkIsAdmin: (req, res, next) => {
    try {
      if (req.tokenInfo.isAdmin) {
        next();
      } else {
        return next(
          new CustomErrorHandler(
            "You're not allowed todo that",
            statusCodeENUM.CONFLICT,
          ),
        );
      }
    } catch (e) {
      next(e);
    }
  },
};
