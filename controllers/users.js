const { NODE_ENV, JWT_KEY } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');

// регистрация
const register = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(201).send(user))
    .catch(next);
};

// авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_KEY : 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Вы авторизованы' })
        .end();
    })
    .catch(next);
};

// возвращает всех пользователей
const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// статью про декоратоы, которую вы посоветовали (https://learn.javascript.ru/call-apply-decorators) вообще не поняла((,
// поэтому переделала 2 контроллера в один (и для поиска юзера, и для обновления юзера),
// если неправильно, буду дальше рефакторить

// поиск пользователя по Id
const getUserInfo = (req, res, next) => {
  User.findById(req.route.path === '/me' ? req.user._id : req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};
// обновляет профиль
// const updateUser = (req, res, next) => {
//   const { name, about, avatar } = req.body;
//   User.findByIdAndUpdate(req.user._id, { name, about, avatar }, {
//     new: true,
//     runValidators: true,
//   })
//     .orFail(() => {
//       throw new NotFoundError('Пользователь не найден');
//     })
//     .then((user) => res.send(user))
//     .catch(next);
// };
// // обновляет аватар
// const updateAvatar = (req, res, next) => {
//   const { avatar } = req.body;
//   User.findByIdAndUpdate(req.user._id, { avatar }, {
//     new: true,
//     runValidators: true,
//   })
//     // .orFail(() => {
//     //   throw new NotFoundError('Пользователь не найден');
//     // })
//     .then((user) => res.send(user))
//     .catch(next);
// };

module.exports = {
  register,
  login,
  getAllUsers,
  getUserInfo,
  updateUserInfo,
};
