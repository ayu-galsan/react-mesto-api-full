"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var bcrypt = require('bcrypt');

var NotFoundError = require('../errors/NotFoundError');

var UnauthorizedError = require('../errors/UnauthorizedError');

var BadRequestError = require('../errors/BadRequestError');

var User = require('../models/user');

var _require = require('../utils/constans'),
    OK_CODE = _require.OK_CODE,
    CREATED_OK_CODE = _require.CREATED_OK_CODE,
    NOT_FOUND_ERROR_CODE = _require.NOT_FOUND_ERROR_CODE,
    NotFoundIdUserErrorText = _require.NotFoundIdUserErrorText,
    ValidationErrorText = _require.ValidationErrorText,
    jwt = _require.jwt,
    SALT_ROUNDS = _require.SALT_ROUNDS,
    NotFoundLoginPasswordText = _require.NotFoundLoginPasswordText,
    DUBLICATE_MONGOOSE_ERROR_CODE = _require.DUBLICATE_MONGOOSE_ERROR_CODE,
    UserExistErrorText = _require.UserExistErrorText;

var ConflictError = require('../errors/ConflictError');

var _process$env = process.env,
    NODE_ENV = _process$env.NODE_ENV,
    JWT_SECRET = _process$env.JWT_SECRET;

var getUsers = function getUsers(req, res, next) {
  var user;
  return regeneratorRuntime.async(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find({}));

        case 3:
          user = _context.sent;
          res.status(OK_CODE).send(user);
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

var login = function login(req, res, next) {
  var _req$body, email, password, user, isValidPassword, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          next(new UnauthorizedError(NotFoundLoginPasswordText));
          return _context2.abrupt("return");

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 10:
          isValidPassword = _context2.sent;

          if (isValidPassword) {
            _context2.next = 14;
            break;
          }

          next(new UnauthorizedError(NotFoundLoginPasswordText));
          return _context2.abrupt("return");

        case 14:
          token = jwt.sign({
            id: user._id
          }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', {
            expiresIn: '7d'
          });
          res.status(OK_CODE).send({
            token: token
          });
          _context2.next = 24;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](1);

          if (!(_context2.t0.name === 'ValidationError')) {
            _context2.next = 23;
            break;
          }

          next(new UnauthorizedError(ValidationErrorText));
          return _context2.abrupt("return");

        case 23:
          next(_context2.t0);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 18]]);
};

var getMyUser = function getMyUser(req, res, next) {
  var user;
  return regeneratorRuntime.async(function getMyUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          next(new NotFoundError(NotFoundIdUserErrorText));
          return _context3.abrupt("return");

        case 7:
          res.status(OK_CODE).send(user);
          _context3.next = 19;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);

          if (!(_context3.t0.name === 'CastError')) {
            _context3.next = 15;
            break;
          }

          next(new BadRequestError(ValidationErrorText));
          return _context3.abrupt("return");

        case 15:
          if (!(_context3.t0.statusCode === NOT_FOUND_ERROR_CODE)) {
            _context3.next = 18;
            break;
          }

          next(new NotFoundError(NotFoundIdUserErrorText));
          return _context3.abrupt("return");

        case 18:
          next(_context3.t0);

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var getUserById = function getUserById(req, res, next) {
  var user;
  return regeneratorRuntime.async(function getUserById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          next(new NotFoundError(NotFoundIdUserErrorText));
          return _context4.abrupt("return");

        case 7:
          res.status(OK_CODE).send(user);
          _context4.next = 19;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);

          if (!(_context4.t0.name === 'CastError')) {
            _context4.next = 15;
            break;
          }

          next(new BadRequestError(ValidationErrorText));
          return _context4.abrupt("return");

        case 15:
          if (!(_context4.t0.statusCode === NOT_FOUND_ERROR_CODE)) {
            _context4.next = 18;
            break;
          }

          next(new NotFoundError(NotFoundIdUserErrorText));
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

var createUser = function createUser(req, res, next) {
  var _req$body2, name, about, avatar, email, password, hash, user, savedUser, _savedUser$toObject, removedPassword, result;

  return regeneratorRuntime.async(function createUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, about = _req$body2.about, avatar = _req$body2.avatar, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context5.next = 4;
            break;
          }

          next(new BadRequestError(NotFoundLoginPasswordText));
          return _context5.abrupt("return");

        case 4:
          _context5.prev = 4;
          _context5.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(password, SALT_ROUNDS));

        case 7:
          hash = _context5.sent;
          user = new User({
            name: name,
            about: about,
            avatar: avatar,
            email: email,
            password: hash
          });
          _context5.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          savedUser = _context5.sent;
          _savedUser$toObject = savedUser.toObject(), removedPassword = _savedUser$toObject.password, result = _objectWithoutProperties(_savedUser$toObject, ["password"]);
          res.status(CREATED_OK_CODE).send(result);
          _context5.next = 25;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](4);

          if (!(_context5.t0.name === 'ValidationError')) {
            _context5.next = 21;
            break;
          }

          next(new BadRequestError(ValidationErrorText));
          return _context5.abrupt("return");

        case 21:
          if (!(_context5.t0.code === DUBLICATE_MONGOOSE_ERROR_CODE)) {
            _context5.next = 24;
            break;
          }

          next(new ConflictError(UserExistErrorText));
          return _context5.abrupt("return");

        case 24:
          next(_context5.t0);

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[4, 16]]);
};

var updateProfile = function updateProfile(req, res, next) {
  var _req$body3, name, about, updateUser;

  return regeneratorRuntime.async(function updateProfile$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, name = _req$body3.name, about = _req$body3.about;
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            name: name,
            about: about
          }, {
            "new": true,
            runValidators: true
          }));

        case 4:
          updateUser = _context6.sent;
          res.status(OK_CODE).send(updateUser);
          _context6.next = 14;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);

          if (!(_context6.t0.name === 'ValidationError')) {
            _context6.next = 13;
            break;
          }

          next(new BadRequestError(ValidationErrorText));
          return _context6.abrupt("return");

        case 13:
          next(_context6.t0);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var updateAvatar = function updateAvatar(req, res, next) {
  var avatar, updateUser;
  return regeneratorRuntime.async(function updateAvatar$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          avatar = req.body.avatar;
          _context7.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            avatar: avatar
          }, {
            "new": true,
            runValidators: true
          }));

        case 4:
          updateUser = _context7.sent;
          res.status(OK_CODE).send(updateUser);
          _context7.next = 14;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);

          if (!(_context7.t0.name === 'ValidationError')) {
            _context7.next = 13;
            break;
          }

          next(new BadRequestError(ValidationErrorText));
          return _context7.abrupt("return");

        case 13:
          next(_context7.t0);

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = {
  getUsers: getUsers,
  getMyUser: getMyUser,
  getUserById: getUserById,
  createUser: createUser,
  updateProfile: updateProfile,
  updateAvatar: updateAvatar,
  login: login
};