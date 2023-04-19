const Card = require('../models/card');
const checkErrors = require('../utils/utils');
// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ cards }))
    .catch((err) => checkErrors(err, res));
};
// создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ card }))
    .catch((err) => checkErrors(err, res));
};
// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((card) => res.send({ card }))
    .catch((err) => checkErrors(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((card) => res.send({ card }))
    .catch((err) => checkErrors(err, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((card) => res.send({ card }))
    .catch((err) => checkErrors(err, res));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
