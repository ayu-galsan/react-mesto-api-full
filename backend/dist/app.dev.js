"use strict";

require('dotenv').config();

var express = require('express');

var _require = require('celebrate'),
    celebrate = _require.celebrate,
    Joi = _require.Joi,
    errors = _require.errors;

var cors = require('cors');

var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === void 0 ? 3001 : _process$env$PORT;

var mongoose = require('mongoose');

var _require2 = require('./routes/app'),
    routes = _require2.routes;

var _require3 = require('./utils/constans'),
    SERVER_ERROR_CODE = _require3.SERVER_ERROR_CODE,
    ServerErrorText = _require3.ServerErrorText,
    urlRegExp = _require3.urlRegExp;

var _require4 = require('./controllers/users'),
    login = _require4.login,
    createUser = _require4.createUser;

var auth = require('./middlewares/auth');

var _require5 = require('./middlewares/logger'),
    requestLogger = _require5.requestLogger,
    errorLogger = _require5.errorLogger;

var app = express();
app.use(express.json());
app.use(cors({
  origin: ['https://domenname.students.nomoreparties.sbs/'],
  credentials: true
}));
app.get('/crash-test', function () {
  setTimeout(function () {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(requestLogger);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    avatar: Joi.string().pattern(urlRegExp)
  })
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  })
}), login);
app.use(auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(function (err, req, res, next) {
  var _err$statusCode = err.statusCode,
      statusCode = _err$statusCode === void 0 ? SERVER_ERROR_CODE : _err$statusCode,
      message = err.message;
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR_CODE ? ServerErrorText : message
  });
  next();
});

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect('mongodb://localhost:27017/mestodb', {
            useNewUrlParser: true,
            useUnifiedTopology: false
          }));

        case 2:
          app.listen(PORT, function () {
            console.log("\u0421\u043B\u0443\u0448\u0430\u0435\u043C ".concat(PORT, " \u043F\u043E\u0440\u0442"));
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

main();