"use strict";

var BadRequestError = require('../errors/BadRequestError');

var ForbiddenError = require('../errors/ForbiddenError');

var NotFoundError = require('../errors/NotFoundError');

var Card = require('../models/card');

var _require = require('../utils/constans'),
    OK_CODE = _require.OK_CODE,
    CREATED_OK_CODE = _require.CREATED_OK_CODE,
    NOT_FOUND_ERROR_CODE = _require.NOT_FOUND_ERROR_CODE,
    NotFoundIdCardErrorText = _require.NotFoundIdCardErrorText,
    ValidationErrorText = _require.ValidationErrorText,
    NotDeleteCardErrorText = _require.NotDeleteCardErrorText,
    FORBIDDEN_ERROR_CODE = _require.FORBIDDEN_ERROR_CODE;

var getCards = function getCards(req, res, next) {
  var card;
  return regeneratorRuntime.async(function getCards$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Card.find({}));

        case 3:
          card = _context.sent;
          res.status(OK_CODE).send(card);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var createCard = function createCard(req, res, next) {
  var owner, _req$body, name, link, card;

  return regeneratorRuntime.async(function createCard$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          owner = req.user.id;
          _req$body = req.body, name = _req$body.name, link = _req$body.link;
          card = new Card({
            name: name,
            link: link,
            owner: owner
          });
          _context2.t0 = res.status(CREATED_OK_CODE);
          _context2.next = 7;
          return regeneratorRuntime.awrap(card.save());

        case 7:
          _context2.t1 = _context2.sent;

          _context2.t0.send.call(_context2.t0, _context2.t1);

          _context2.next = 17;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t2 = _context2["catch"](0);

          if (!(_context2.t2.name === 'ValidationError')) {
            _context2.next = 16;
            break;
          }

          next(new BadRequestError("".concat(ValidationErrorText, " \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438")));
          return _context2.abrupt("return");

        case 16:
          next(_context2.t2);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var deleteCardById = function deleteCardById(req, res, next) {
  var card;
  return regeneratorRuntime.async(function deleteCardById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Card.findById(req.params.cardId));

        case 3:
          card = _context3.sent;

          if (card) {
            _context3.next = 7;
            break;
          }

          next(new NotFoundError(NotFoundIdCardErrorText));
          return _context3.abrupt("return");

        case 7:
          if (card.owner.equals(req.user.id)) {
            _context3.next = 10;
            break;
          }

          next(new ForbiddenError(NotDeleteCardErrorText));
          return _context3.abrupt("return");

        case 10:
          _context3.t0 = res.status(OK_CODE);
          _context3.next = 13;
          return regeneratorRuntime.awrap(card.deleteOne());

        case 13:
          _context3.t1 = _context3.sent;

          _context3.t0.send.call(_context3.t0, _context3.t1);

          _context3.next = 29;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t2 = _context3["catch"](0);

          if (!(_context3.t2.name === 'CastError')) {
            _context3.next = 22;
            break;
          }

          next(new BadRequestError("".concat(ValidationErrorText, " \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438")));
          return _context3.abrupt("return");

        case 22:
          if (!(_context3.t2.statusCode === NOT_FOUND_ERROR_CODE)) {
            _context3.next = 25;
            break;
          }

          next(new NotFoundError(NotFoundIdCardErrorText));
          return _context3.abrupt("return");

        case 25:
          if (!(_context3.t2.statusCode === FORBIDDEN_ERROR_CODE)) {
            _context3.next = 28;
            break;
          }

          next(new ForbiddenError(NotDeleteCardErrorText));
          return _context3.abrupt("return");

        case 28:
          next(_context3.t2);

        case 29:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

var likeCard = function likeCard(req, res, next) {
  var card;
  return regeneratorRuntime.async(function likeCard$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Card.findByIdAndUpdate(req.params.cardId, {
            $addToSet: {
              likes: req.user.id
            }
          }, {
            "new": true
          }));

        case 3:
          card = _context4.sent;

          if (card) {
            _context4.next = 7;
            break;
          }

          next(new NotFoundError(NotFoundIdCardErrorText));
          return _context4.abrupt("return");

        case 7:
          res.status(OK_CODE).send(card);
          _context4.next = 19;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);

          if (!(_context4.t0.kind === 'ObjectId')) {
            _context4.next = 15;
            break;
          }

          next(new BadRequestError("".concat(ValidationErrorText, " \u043F\u0440\u0438 \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u043B\u0430\u0439\u043A\u0430")));
          return _context4.abrupt("return");

        case 15:
          if (!(_context4.t0.statusCode === NOT_FOUND_ERROR_CODE)) {
            _context4.next = 18;
            break;
          }

          next(new NotFoundError(NotFoundIdCardErrorText));
          return _context4.abrupt("return");

        case 18:
          next(_context4.t0);

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var dislikeCard = function dislikeCard(req, res, next) {
  var card;
  return regeneratorRuntime.async(function dislikeCard$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Card.findByIdAndUpdate(req.params.cardId, {
            $pull: {
              likes: req.user.id
            }
          }, {
            "new": true
          }));

        case 3:
          card = _context5.sent;

          if (card) {
            _context5.next = 7;
            break;
          }

          next(new NotFoundError(NotFoundIdCardErrorText));
          return _context5.abrupt("return");

        case 7:
          res.status(OK_CODE).send(card);
          _context5.next = 19;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);

          if (!(_context5.t0.kind === 'ObjectId')) {
            _context5.next = 15;
            break;
          }

          next(new BadRequestError("".concat(ValidationErrorText, " \u043F\u0440\u0438 \u0441\u043D\u044F\u0442\u0438\u0438 \u043B\u0430\u0439\u043A\u0430")));
          return _context5.abrupt("return");

        case 15:
          if (!(_context5.t0.statusCode === NOT_FOUND_ERROR_CODE)) {
            _context5.next = 18;
            break;
          }

          next(new NotFoundError(NotFoundIdCardErrorText));
          return _context5.abrupt("return");

        case 18:
          next(_context5.t0);

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  getCards: getCards,
  createCard: createCard,
  deleteCardById: deleteCardById,
  likeCard: likeCard,
  dislikeCard: dislikeCard
};