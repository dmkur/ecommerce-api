const { userService, authService } = require('../services');

module.exports = {
  updateById: async (req, res, next) => {
    try {
      const { password } = req.body;
      // якщо це password знову його шифруємо
      if (password) {
        req.body.password = authService.hashedPasswords(password).toString();
      }

      const updatedUser = await userService.updateById(req.params.id, req.body);

      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
};
