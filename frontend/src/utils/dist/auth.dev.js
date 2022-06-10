"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
exports.authorize = authorize;
exports.getContent = getContent;
exports.BASE_URL = void 0;
var BASE_URL = "http://localhost:3001";
exports.BASE_URL = BASE_URL;

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  }

  return res.json();
}

function register(email, password) {
  return fetch("".concat(BASE_URL, "/signup"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(checkResponse);
}

function authorize(email, password) {
  return fetch("".concat(BASE_URL, "/signin"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(checkResponse);
}

function getContent(token) {
  return fetch("".concat(BASE_URL, "/users/me"), {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    }
  }).then(checkResponse);
}