const { userService, authService, tokenService} = require('../services');
const {statusCodeENUM} = require("../constants");

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
  },
  deleteById: async (req, res, next) => {
    try {
      await userService.deleteById(req.params.id);

      res.json('User has been deleted!');
    } catch (e) {
      next(e);
    }
  },
  getById: async (req, res, next) => {
    try {
      const user = await userService.getById(req.params.id);

      const { password, ...userInfo } = user._doc;

      res.json(userInfo);
    } catch (e) {
      next(e);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const query = req.query.new;

      const users = query
        ? await userService.find().sort({ _id: -1 }).limit(5)
        : await userService.find();
      // sort({ _id: -1 }).limit(1) - сортування по id найновіший юзер, ліміт 5
      // тобто віддати 5 найновіших юзерів

      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  getUserStats: async (req, res, next) => {
    try {
      const data = await userService.stats();

      res.json(data);
    } catch (e) {
      next(e);
    }
  },
  createNewUser: async (req, res, next) => {
    try {
      const hashedPassword = await tokenService.hashPassword(req.body.password);

      const newUser = await userService.create({ ...req.body, password: hashedPassword });

      res.status(statusCodeENUM.CREATE).json(newUser);
    } catch (e) {
      next(e);
    }
  },
};
