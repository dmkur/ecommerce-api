const { constants, statusCodeENUM } = require('../constants');
const { CustomErrorHandler } = require('../errors');
const { authService, tokenService, userService } = require('../services');

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

      const tokenInfo = await authService.findOne({ access_token });

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
      if (
        req.tokenInfo.user.toString() === req.params.id
        || req.tokenInfo.isAdmin
      ) {
        // add toString() coz without, mongo return ObjectId("dkfksdjfdskjfsfkj")

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
  checkUserAdminStatus: (typeCheck) => async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getById(id);
      if (!user) next(new CustomErrorHandler('Not found', statusCodeENUM.NOT_FOUND));

      switch (typeCheck) {
        case 'admin':
          console.log(user.isAdmin, 'V1');
          if (user.isAdmin) {
            next(
              new CustomErrorHandler(
                'User already have admin status',
                statusCodeENUM.CONFLICT,
              ),
            );
          }
          break;
        case 'notAdmin':
          if (!user.isAdmin) {
            next(
              new CustomErrorHandler(
                'User have not admin status',
                statusCodeENUM.CONFLICT,
              ),
            );
          }
          break;
        default:
      }
      req.possibleAdmin = user;

      next();
    } catch (e) {
      next(e);
    }
  },
};
