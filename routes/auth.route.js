const { Router } = require('express');
const CryptoJS = require('crypto-js');
const { User } = require('../models');
const { PAS_SEC } = require('../config/config');

const authRouter = Router();

// REGISTER
authRouter.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, PAS_SEC)
      .toString(),
  });

  try {
    const savedUser = await newUser.save();

    res.status(201)
      .json(savedUser);
  } catch (err) {
    res.status(500)
      .json(err);
  }
});

// LOGIN
authRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401)
        .json('Wrong credentials111');
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, PAS_SEC);

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      res.status(401)
        .json('Wrong credentials222');
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const { password, ...other } = user._doc;
    // чомусь mongoose зберігає цілий файл з різними данними
    // а наш юзер в полі _doc тому доступаємся так

    res.json(other);
  } catch (err) {
    res.status(500)
      .json(err);
  }
});

module.exports = authRouter;
