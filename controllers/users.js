const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

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
    .then((user) => res.status(201).send({ user }))
    .catch(next);
};

// авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, '88cae81194b55ef1ac10eeba0fd01e4fed0561d0a2fc4d1c863b32eda8bd273f', { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send(req.cookies)
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

// возвращает информацию о текущем пользователе
const getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

// возвращает пользователя по _id
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

// обновляет профиль
const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, {
    new: true,
    runValidators: true,
  })
    // .orFail(() => {
    //   throw new NotFoundError('Пользователь не найден');
    // })
    .then((user) => res.send(user))
    .catch(next);
};
// обновляет аватар
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    // .orFail(() => {
    //   throw new NotFoundError('Пользователь не найден');
    // })
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports = {
  register,
  login,
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
};
