"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setToken = setToken;
exports.getToken = getToken;
exports.removeToken = removeToken;
var TOKEN_KEY = "token";

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}