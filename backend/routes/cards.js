const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardsRoutes = express.Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { urlRegExp } = require('../utils/constans');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
}), createCard);

cardsRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCardById);

cardsRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

cardsRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = cardsRoutes;
