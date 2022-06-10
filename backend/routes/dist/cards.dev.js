"use strict";

var express = require('express');

var _require = require('celebrate'),
    celebrate = _require.celebrate,
    Joi = _require.Joi;

var cardsRoutes = express.Router();

var _require2 = require('../controllers/cards'),
    getCards = _require2.getCards,
    createCard = _require2.createCard,
    deleteCardById = _require2.deleteCardById,
    likeCard = _require2.likeCard,
    dislikeCard = _require2.dislikeCard;

var auth = require('../middlewares/auth');

var _require3 = require('../utils/constans'),
    urlRegExp = _require3.urlRegExp;

cardsRoutes.get('/', auth, getCards);
cardsRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp)
  })
}), auth, createCard);
cardsRoutes["delete"]('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
  }).unknown(true)
}), auth, deleteCardById);
cardsRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
  }).unknown(true)
}), auth, likeCard);
cardsRoutes["delete"]('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
  }).unknown(true)
}), auth, dislikeCard);
module.exports = cardsRoutes;