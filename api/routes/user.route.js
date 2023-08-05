const { Router } = require('express');
const CryptoJS = require('crypto-js');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');
const { User } = require('../models');
const { userController } = require('../controllers');
const { authMddlwr } = require('../middlewares');

const userRouter = Router();

// UPDATE
userRouter.put(
  '/:id',
  authMddlwr.checkAccessToken,
  userController.updateById
);

// DELETE
userRouter.delete(
  '/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.checkAuthorization,
  userController.deleteById
);

// GET BY ID
userRouter.get(
  '/find/:id',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  userController.getById
);

// GET ALL
userRouter.get(
  '/',
  authMddlwr.checkAccessToken,
  authMddlwr.verifyAdmin,
  userController.getAll
);

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
