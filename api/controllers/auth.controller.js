const { userService, authService, tokenService } = require('../services');
const { statusCodeENUM } = require('../constants');
const { CustomErrorHandler } = require('../errors');
const { PAS_SEC } = require('../config/config');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { password: hashedPassword, _id } = req.user;

      await tokenService.comparePassword(password, hashedPassword);

      const authTokens = tokenService.createAuthTokens({ _id });

      tokenService.saveTokens({ ...authTokens, user: _id });

      res.json({ ...authTokens, user: _id });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { user, access_token } = req.tokenInfo;

      await authService.deleteOneByParams({ user: user._id, access_token });

      res.sendStatus(statusCodeENUM.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },
};
