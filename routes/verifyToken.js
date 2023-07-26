const jwt = require('jsonwebtoken');
const { JWT_SEC } = require('../config/config');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // тут ми розшифрували токен і отримали id, isAdmin про юзера який шифрували ранші
    jwt.verify(token, JWT_SEC, (err, user) => {
      if (err) res.status(403).json('Token isn`t valid');
      // і ств новий обєкт в тілі req з данними які отримали id, isAdmin
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json('You`re not authenticated!');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json('You`re not allowed to do that!');
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json('You`re not allowed to do that!');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};
