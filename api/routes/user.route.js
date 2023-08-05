const { Router } = require('express');
const CryptoJS = require('crypto-js');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');
const { PAS_SEC } = require('../config/config');
const { User } = require('../models');
const { userController } = require('../controllers');
const { authMddlwr } = require('../middlewares');

const userRouter = Router();

// UPDATE
userRouter.put('/:id', authMddlwr.checkAccessToken, userController.updateById);


// DELETE
userRouter.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findOneAndDelete(req.params.id);

    res.send('User has been deleted!');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BY ID
userRouter.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...other } = user._doc;

    res.send(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
userRouter.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;

    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    // sort({ _id: -1 }).limit(1) - сортування по id найновіший юзер, ліміт 5
    // тобто віддати 5 найновіших юзерів

    res.send(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER STATS

userRouter.get('/stats', async (req, res) => {
  const date = new Date(); // current date
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); // return last year from today

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, // match users during last year from today
      { $project: { month: { $month: '$createdAt' } } }, // return month from createdAt field
      { $group: { _id: '$month', total: { $sum: 1 } } }, // return id:9 -september, total:2 - qty users
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = userRouter;
