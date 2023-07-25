const { userService } = require("../services");

module.exports = {
  createUser: async (req, res) => {
    try {
      console.log(req.body);
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
