const Card = require('../models/card');

// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
// создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send('Карточка успешно удалена'))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
