const { userService } = require('../services');
const { CustomErrorHandler } = require('../errors');
const { statusCodeENUM } = require('../constants');

module.exports = {
  checkIsUniqEmail: (req, res, next) => {
    try {
      const { email } = req.body;
      const user = userService.findOneByParams({ email });

      if (user) next(new CustomErrorHandler('Email already exist', statusCodeENUM.CONFLICT));

      next();
    } catch (e) {
      next(e);
    }
  },
  getUserByDynemicParams: (from = 'body', field = 'email', dbField = field) => async (req, res, next) => {
    try {
      const fieldToSearch = req[from][field];

      const user = await userService.findOneByParams({ [dbField]: fieldToSearch });

      if (!user) next(new CustomErrorHandler('Not found', statusCodeENUM.NOT_FOUND));

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },
  isUserPresent: (from = 'params') => async (req, res, next) => {
    try {
      const { userId } = req[from];

      const user = await userService.getById(userId);

      if (!user) {
        return next(new CustomErrorHandler('Not found', statusCodeENUM.NOT_FOUND));
      }

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
