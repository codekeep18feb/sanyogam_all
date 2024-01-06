"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _reactRedux = require("react-redux");
var _reselect = require("reselect");
var _counterSelector = require("../redux/counter/counter-selector");
var _counterComponentStyle = _interopRequireDefault(require("./counter-component-style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CounterComponent = _ref => {
  let {
    currentCounter
  } = _ref;
  const style = (0, _counterComponentStyle.default)();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: style.counterText
  }, currentCounter));
};
const mapStateToProps = (0, _reselect.createStructuredSelector)({
  currentCounter: _counterSelector.selectCurrentCounter
});
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps)(CounterComponent);