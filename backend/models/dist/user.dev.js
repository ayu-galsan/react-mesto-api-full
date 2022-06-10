"use strict";

var mongoose = require('mongoose');

var _validator = require('validator'); // схема пользователя


var userSchema = new mongoose.Schema({
  name: {
    type: String,
    "default": 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    "default": 'Исследователь',
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    validate: {
      validator: function validator(link) {
        return _validator.isURL(link);
      },
      message: 'Неправильный url-адрес'
    },
    "default": 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function validator(link) {
        return _validator.isURL(link);
      },
      message: 'Неправильный url-адрес'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});
module.exports = mongoose.model('user', userSchema);