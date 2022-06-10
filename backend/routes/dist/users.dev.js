"use strict";

var express = require('express');

var _require = require('celebrate'),
    celebrate = _require.celebrate,
    Joi = _require.Joi;

var usersRoutes = express.Router();

var auth = require('../middlewares/auth');

var _require2 = require('../controllers/users'),
    getUsers = _require2.getUsers,
    getUserById = _require2.getUserById,
    getMyUser = _require2.getMyUser,
    updateProfile = _require2.updateProfile,
    updateAvatar = _require2.updateAvatar;

var _require3 = require('../utils/constans'),
    urlRegExp = _require3.urlRegExp;

usersRoutes.get('/', auth, getUsers);
usersRoutes.get('/me', auth, getMyUser);
usersRoutes.get('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required()
  }).unknown(true)
}), getUserById);
usersRoutes.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  }).unknown(true)
}), updateProfile);
usersRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp)
  }).unknown(true)
}), auth, updateAvatar);
module.exports = usersRoutes;