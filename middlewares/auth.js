const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  console.log('headers=>', req.headers.cookie);
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('token')) {
    return res.status(401).send({ message: '1Необходима авторизация' });
  }
  const token = cookie.replace('token=', '');
  console.log('token=>', token);
  let payload;
  try {
    payload = jwt.verify(token, '88cae81194b55ef1ac10eeba0fd01e4fed0561d0a2fc4d1c863b32eda8bd273f');
  } catch (err) {
    return res.status(401).send({ message: '2Необходима авторизация' });
  }
  req.user = payload;
  console.log('payload =>', payload);
  next();
};

module.exports = auth;
