"use strict";

var UnauthorizedError = require('../errors/UnauthorizedError');

var _require = require('../utils/constans'),
    jwt = _require.jwt,
    NotFoundAuthorizationText = _require.NotFoundAuthorizationText;

var _process$env = process.env,
    NODE_ENV = _process$env.NODE_ENV,
    JWT_SECRET = _process$env.JWT_SECRET; // eslint-disable-next-line consistent-return

module.exports = function (req, res, next) {
  var authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(NotFoundAuthorizationText));
    return;
  }

  var token = authorization.replace('Bearer ', '');
  var payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedError(NotFoundAuthorizationText));
    return;
  }

  req.user = payload;
  next();
};