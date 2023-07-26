const { Router } = require('express');
const CryptoJS = require('crypto-js');
const { verifyTokenAndAuthorization } = require('./verifyToken');
const { PAS_SEC } = require('../config/config');
const { User } = require('../models');

const userRouter = Router();

userRouter.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    // якщо це password знову його шифруємо
    req.body.password = CryptoJS.AES.encrypt(req.body.password, PAS_SEC).toString();
  }

  try {
    const upadatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    //    { new: true } - return new user

    res.json(upadatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = userRouter;
