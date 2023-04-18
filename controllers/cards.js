const Card = require('../models/card');
const checkErrors = require('../utils');
// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((data) => res.send(data))
    .catch((err) => checkErrors(err, res));
};
// создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => checkErrors(err, res));
};
// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send('Карточка успешно удалена'))
    .catch((err) => checkErrors(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => checkErrors(err, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => checkErrors(err, res));
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
