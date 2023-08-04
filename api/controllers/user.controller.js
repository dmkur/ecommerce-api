const { userService, authService } = require('../services');
const { statusCode } = require('../constants');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const hashedPass = await authService.hashedPasswords(req.body.password);

      const newUser = await userService.create({ ...req.body, password: hashedPass });

      res.status(statusCode.CREATE).json(newUser);
    } catch (e) {
      next(e);
    }
  }
};
