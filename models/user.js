const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Не заполнено поле name'],
    minlength: [2, 'Недостаточное количество символов в поле name'],
    maxlength: [30, 'Превышен максимальный размер поля name'],
  },
  about: {
    type: String,
    required: [true, 'Не заполнено поле about'],
    minlength: [2, 'Недостаточное количество символов в поле about'],
    maxlength: [30, 'Превышен максимальный размер поля name'],
  },
  avatar: {
    type: String,
    required: [true, 'Не заполнено поле avatar'],
  },
});

module.exports = mongoose.model('user', userSchema);
