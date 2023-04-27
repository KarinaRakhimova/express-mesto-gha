const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const checkErrors = require('../utils/utils');

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, '88cae81194b55ef1ac10eeba0fd01e4fed0561d0a2fc4d1c863b32eda8bd273f', { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

// возвращает всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => checkErrors(err, res));
};

// возвращает пользователя по _id
const getUser = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    // .orFail(() => {
    //   const err = new Error('Пользователь не найден');
    //   err.name = 'NotFoundError';
    //   throw err;
    // })
    .then((user) => res.send({ user }))
    .catch((err) => checkErrors(err, res));
};

// создаёт пользователя
const createUser = (req, res) => {
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
    .catch((err) => checkErrors(err, res));
};

// обновляет профиль
const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((user) => res.send({ user }))
    .catch((err) => checkErrors(err, res));
};
// обновляет аватар
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((user) => res.send({ user }))
    .catch((err) => checkErrors(err, res));
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
