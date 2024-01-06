"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _redux = require("redux");
var _counterReducer = _interopRequireDefault(require("./counter/counter-reducer"));
var _AuthReducer = _interopRequireDefault(require("./counter/AuthReducer"));
var _GlobalDataReducer = _interopRequireDefault(require("./counter/GlobalDataReducer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// reducers.js

// Import your counterReducer here
// Import your counterReducer here

const rootReducer = (0, _redux.combineReducers)({
  counter: _counterReducer.default,
  // You can give it any key you like
  auth: _AuthReducer.default,
  globalData: _GlobalDataReducer.default
  // Add other reducers if needed
});
var _default = exports.default = rootReducer;