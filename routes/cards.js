const cardsRouter = require('express').Router();
// const bodyParser = require('body-parser');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// cardsRouter.use(bodyParser.json());
// cardsRouter.use(bodyParser.urlencoded({ extended: true }));

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);
module.exports = cardsRouter;
