const User = require('../models/user');
const checkErrors = require('../utils');

// возвращает всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => checkErrors(err, res));
};

// возвращает пользователя по _id
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => checkErrors(err, res));
};

// создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => checkErrors(err, res));
};

// обновляет профиль
const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkErrors(err, res));
};
// обновляет аватар
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true, // если пользователь не найден, он будет создан
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkErrors(err, res));
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
