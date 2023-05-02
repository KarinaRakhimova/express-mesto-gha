const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
