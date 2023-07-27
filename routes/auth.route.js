const { Router } = require('express');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {
  PAS_SEC,
  JWT_SEC,
  ACCESS_TOKEN_LIFETIME
} = require('../config/config');

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

    // у payload додаємо два праметри, щоб потім їх використати при аунтифікації юзера і його прав
    const accessToken = jwt.sign({
      id: user._id, isAdmin: user.isAdmin
    }, JWT_SEC, { expiresIn: ACCESS_TOKEN_LIFETIME });

    // eslint-disable-next-line no-unused-vars
    const { password, ...other } = user._doc;
    // чомусь mongoose зберігає цілий файл з різними данними
    // а наш юзер в полі _doc тому доступаємся так

    res.json({ ...other, accessToken });
  } catch (err) {
    res.status(500)
      .json(err);
  }
});


module.exports = authRouter;
