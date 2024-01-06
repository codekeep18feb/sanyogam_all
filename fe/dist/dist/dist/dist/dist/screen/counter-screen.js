"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _counterAction = require("../redux/counter/counter-action");
var _Container = _interopRequireDefault(require("@material-ui/core/Container"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _counterComponent = _interopRequireDefault(require("../component/counter-component"));
var _reselect = require("reselect");
var _counterSelector = require("../redux/counter/counter-selector");
var _counterScreenDesign = _interopRequireDefault(require("./counter-screen-design"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
const CounterScreen = props => {
  const classes = (0, _counterScreenDesign.default)();
  const counterIncreaseButtonClicked = () => {
    props.setCurrentCounter(props.currentCounter + 1);
  };
  const counterDecreaseButtonClicked = () => {
    if (props.currentCounter > 0) props.setCurrentCounter(props.currentCounter - 1);
  };
  return /*#__PURE__*/_react.default.createElement(_Container.default, {
    component: "main"
  }, /*#__PURE__*/_react.default.createElement("div", null, "v2"), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.paper
  }, /*#__PURE__*/_react.default.createElement(_counterComponent.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: classes.buttonContainer
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    onClick: () => counterDecreaseButtonClicked()
  }, "Decrease"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    color: "primary",
    onClick: () => counterIncreaseButtonClicked()
  }, "Increase"))));
};
const mapDispatchToProps = dispatch => ({
  setCurrentCounter: counter => dispatch((0, _counterAction.setCurrentCounter)(counter))
});
const mapStateToProps = (0, _reselect.createStructuredSelector)({
  currentCounter: _counterSelector.selectCurrentCounter
});
var _default = exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CounterScreen);