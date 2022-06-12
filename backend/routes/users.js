const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRoutes = express.Router();
const {
  getUsers,
  getUserById,
  getMyUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { urlRegExp } = require('../utils/constans');

usersRoutes.get('/', getUsers);

usersRoutes.get('/me', getMyUser);

usersRoutes.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

usersRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp),
  }),
}), updateAvatar);

module.exports = usersRoutes;
