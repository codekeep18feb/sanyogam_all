"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _redux = require("redux");
var _reduxDevtoolsExtension = require("redux-devtools-extension");
var _rootReducer = _interopRequireDefault(require("./root-reducer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// store.js

// const store = createStore(rootReducer);
const store = (0, _redux.createStore)(_rootReducer.default, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)( /* Your middleware here */)));
var _default = exports.default = store;