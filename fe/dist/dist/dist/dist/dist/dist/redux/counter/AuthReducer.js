"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// AuthReducer.js
const initialState = {
  data: null
};
const AuthReducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        data: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        data: null
      };
    default:
      return state;
  }
};
var _default = exports.default = AuthReducer;