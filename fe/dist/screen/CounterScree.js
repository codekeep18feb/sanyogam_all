"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _counterAction = require("../redux/counter/counter-action");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Example component

const CounterScree = _ref => {
  let {
    count,
    increment,
    decrement
  } = _ref;
  console.log('what is this count here', count);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "Count: ", count), /*#__PURE__*/_react.default.createElement("button", {
    onClick: increment
  }, "Increment"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: decrement
  }, "Decrement"));
};
const mapStateToProps = state => {
  console.log("stater", state.counter.count);
  return {
    count: state.counter.count // Assuming you have a reducer that manages a "count" property
  };
};
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  increment: _counterAction.increment,
  decrement: _counterAction.decrement
})(CounterScree);