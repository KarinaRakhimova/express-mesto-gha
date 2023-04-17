const Card = require('../models/card');

const ERROR_CODE = 400;
// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'wrongData') return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
    });
};
// создаёт карточку
const createCard = (req, res) => {
  Card.create({ name: req.body.name, link: req.body.link, owner: req.user._id })
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
