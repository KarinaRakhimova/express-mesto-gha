const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Не заполнено поле name'],
    minlength: [2, 'Недостаточное количество символов в поле name'],
    maxlength: [30, 'Превышен максимальный размер поля name'],
  },
  link: {
    type: String,
    required: [true, 'Не заполнено поле link'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Не заполнено поле owner'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
