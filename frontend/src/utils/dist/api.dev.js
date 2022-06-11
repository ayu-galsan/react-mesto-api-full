"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Api =
/*#__PURE__*/
function () {
  function Api(_ref) {
    var address = _ref.address,
        headers = _ref.headers;

    _classCallCheck(this, Api);

    this.address = address;
    this._headers = headers;
  }

  _createClass(Api, [{
    key: "getInitialCards",
    value: function getInitialCards() {
      var _this = this;

      return fetch("".concat(this.address, "/cards"), {
        headers: this._headers
      }).then(function (res) {
        return _this._getResponseData(res);
      });
    }
  }, {
    key: "getUserData",
    value: function getUserData() {
      var _this2 = this;

      return fetch("".concat(this.address, "/users/me"), {
        headers: this._headers
      }).then(function (res) {
        return _this2._getResponseData(res);
      });
    }
  }, {
    key: "changeLikeCardStatus",
    value: function changeLikeCardStatus(id, isLiked) {
      var _this3 = this;

      var method = isLiked ? 'DELETE' : 'PUT';
      return fetch("".concat(this.address, "/cards/").concat(id, "/likes"), {
        method: method,
        headers: this._headers
      }).then(function (res) {
        return _this3._getResponseData(res);
      });
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(id) {
      var _this4 = this;

      return fetch("".concat(this.address, "/cards/").concat(id), {
        method: 'DELETE',
        headers: this._headers
      }).then(function (res) {
        return _this4._getResponseData(res);
      });
    }
  }, {
    key: "editProfile",
    value: function editProfile(data) {
      var _this5 = this;

      return fetch("".concat(this.address, "/users/me"), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      }).then(function (res) {
        return _this5._getResponseData(res);
      });
    }
  }, {
    key: "editAvatar",
    value: function editAvatar(data) {
      var _this6 = this;

      return fetch("".concat(this.address, "/users/me/avatar"), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.link
        })
      }).then(function (res) {
        return _this6._getResponseData(res);
      });
    }
  }, {
    key: "addNewCard",
    value: function addNewCard(data) {
      var _this7 = this;

      return fetch("".concat(this.address, "/cards"), {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.place,
          link: data.link
        })
      }).then(function (res) {
        return _this7._getResponseData(res);
      });
    }
  }, {
    key: "_getResponseData",
    value: function _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }

      return res.json();
    }
  }]);

  return Api;
}();

var api = new Api({
  address: "https://api.domenname.students.nomoreparties.sbs/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer ".concat(localStorage.getItem('token'))
  }
});
var _default = api;
exports["default"] = _default;