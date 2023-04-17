const User = require('../models/user');

// возвращает всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data));
};

// возвращает пользователя по _id
const getUser = (req, res) => {
  console.log(req.params, 'getUser req.params');
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

// создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
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
    .catch((err) => res.status(500).send({ message: 'Данные не прошли валидацию.' }));
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
    .catch((err) => res.status(500).send({ message: 'Данные не прошли валидацию.' }));
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
