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

      res.json({ ...authTokens, user: _id });
    } catch (e) {
      next(e);
    }
  }
  // login: async (req, res, next) => {
  //   try {
  //     const user = await authService.findUser({ username: req.body.username });
  //     if (!user) {
  //       return next(new CustomErrorHandler('Not Found', statusCodeENUM.NOT_FOUND));
  //     }
  //
  //     const originalPass = authService.unhashedPasswords(user.password, PAS_SEC);
  //     if (originalPass !== req.body.password) {
  //       return next(new CustomErrorHandler('Wrong credentials', statusCodeENUM.UNAUTHORIZED));
  //     }
  //
  //     // у payload додаємо два праметри, щоб потім їх використати при аунтифікації юзера і його прав
  //     const accessToken = authService.createAuthTokens({ id: user._id, isAdmin: user.isAdmin });
  //
  //     // забираємо поле password
  //     const { password, ...other } = user._doc;
  //     // чомусь mongoose зберігає цілий файл з різними данними
  //     // а наш юзер в полі _doc тому доступаємся так
  //
  //     res.json({ ...other, accessToken });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

};
