const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('token')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = cookie.replace('token=', '');
  let payload;
  try {
    payload = jwt.verify(token, '88cae81194b55ef1ac10eeba0fd01e4fed0561d0a2fc4d1c863b32eda8bd273f');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};

module.exports = auth;
