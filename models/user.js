const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email указан некорректно',
    },
  },
  password: {
    type: String,
    required: [true, 'Не заполнено поле password'],
    select: false,
    minlength: [8, 'Недостаточное количество символов в поле password'],
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Недостаточное количество символов в поле name'],
    maxlength: [30, 'Превышен максимальный размер поля name'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Недостаточное количество символов в поле about'],
    maxlength: [30, 'Превышен максимальный размер поля name'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatar) {
        return /https?:\/\/[w{3}\.]?[\w\W]*\.[a-z\W]{2,3}#?/.test(avatar);
      },
      message: 'Неверный формат ссылки',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(
          'Неправильные почта или пароль',
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(
            'Неправильные почта или пароль',
          );
        }
        return user;
      });
    });
};
module.exports = mongoose.model('user', userSchema);
