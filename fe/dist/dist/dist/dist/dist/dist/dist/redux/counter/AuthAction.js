"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = void 0;
// actions.js
const login = payload => {
  return {
    type: 'LOGIN',
    payload
  };
};
exports.login = login;
const logout = () => {
  return {
    type: 'LOGOUT'
  };
};
exports.logout = logout;