const { userService, authService } = require('../services');
const { statusCode } = require('../constants');
const { CustomErrorHandler } = require('../errors');
const { PAS_SEC } = require('../config/config');

module.exports = {
  register: async (req, res, next) => {
    try {
      const hashedPass = await authService.hashedPasswords(req.body.password);

      const newUser = await userService.create({ ...req.body, password: hashedPass });

      res.status(statusCode.CREATE).json(newUser);
    } catch (e) {
      next(e);
    }
  },

  login: async (req, res, next) => {
    try {
      const user = await authService.findUser({ username: req.body.username });
      if (!user) {
        return next(new CustomErrorHandler('Not Found', statusCode.NOT_FOUND));
      }

      const originalPass = authService.unhashedPasswords(user.password, PAS_SEC);
      if (originalPass !== req.body.password) {
        return next(new CustomErrorHandler('Wrong credentials', statusCode.UNAUTHORIZED));
      }

      // у payload додаємо два праметри, щоб потім їх використати при аунтифікації юзера і його прав
      const accessToken = authService.createAuthTokens({ id: user._id, isAdmin: user.isAdmin });

      const { password, ...other } = user._doc;
      // чомусь mongoose зберігає цілий файл з різними данними
      // а наш юзер в полі _doc тому доступаємся так

      res.json({ ...other, accessToken });
    } catch (e) {
      next(e);
    }
  }

};
