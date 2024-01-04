const { authService, tokenService, userService } = require("../services");
const { statusCodeENUM } = require("../constants");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { password: hashedPassword, _id, isAdmin } = req.user;

      await authService.comparePassword(password, hashedPassword);

      const authTokens = tokenService.createAuthTokens({ _id });

      tokenService.saveTokens({ ...authTokens, user: _id, isAdmin });

      res.json({ ...authTokens, user: _id, isAdmin });
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
  changeAdminStatus: async (req, res, next) => {
    try {
      const { id, isAdmin } = req.possibleAdmin;
      const newUser = await userService.updateById(id, { isAdmin: !isAdmin });

      res.json(newUser);
    } catch (e) {
      next(e);
    }
  },
};
