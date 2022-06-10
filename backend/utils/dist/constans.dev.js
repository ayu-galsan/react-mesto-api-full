"use strict";

var jwt = require('jsonwebtoken');

var SALT_ROUNDS = 10;
var OK_CODE = 200;
var CREATED_OK_CODE = 201;
var BAD_REQUEST_ERROR_CODE = 400;
var UNAUTHORIZED_ERROR_CODE = 401;
var FORBIDDEN_ERROR_CODE = 403;
var NOT_FOUND_ERROR_CODE = 404;
var CONFLICT_ERROR_CODE = 409;
var SERVER_ERROR_CODE = 500;
var DUBLICATE_MONGOOSE_ERROR_CODE = 11000;
var ServerErrorText = 'На сервере произошла ошибка';
var NotFoundIdUserErrorText = 'Пользователь с таким id не найден в базе';
var ValidationErrorText = 'Переданы некорректные данные';
var NotFoundIdCardErrorText = 'Карточка с указанным _id не найдена';
var NotFoundPageText = 'Страница не найдена';
var NotFoundAuthorizationText = 'Нет доступа - необходима авторизация';
var NotFoundLoginPasswordText = 'Неправильный логин или пароль';
var UserExistErrorText = 'Пользователь с такими данными уже существует';
var NotDeleteCardErrorText = 'Невозможно удалить чужую карточку'; // eslint-disable-next-line prefer-regex-literals

var urlRegExp = new RegExp(/https?:\/\/(www\.)?[0-9A-Za-z-@:%._\\+~#=]{1,}\.[a-z()]{1,}\b([a-z()@:%_\\+.~#?&//=]*#?)/);
module.exports = {
  jwt: jwt,
  SALT_ROUNDS: SALT_ROUNDS,
  OK_CODE: OK_CODE,
  CREATED_OK_CODE: CREATED_OK_CODE,
  BAD_REQUEST_ERROR_CODE: BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE: UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE: FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE: NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE: CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE: SERVER_ERROR_CODE,
  DUBLICATE_MONGOOSE_ERROR_CODE: DUBLICATE_MONGOOSE_ERROR_CODE,
  ServerErrorText: ServerErrorText,
  NotFoundIdUserErrorText: NotFoundIdUserErrorText,
  ValidationErrorText: ValidationErrorText,
  NotFoundIdCardErrorText: NotFoundIdCardErrorText,
  NotFoundPageText: NotFoundPageText,
  NotFoundAuthorizationText: NotFoundAuthorizationText,
  NotFoundLoginPasswordText: NotFoundLoginPasswordText,
  UserExistErrorText: UserExistErrorText,
  NotDeleteCardErrorText: NotDeleteCardErrorText,
  urlRegExp: urlRegExp
};