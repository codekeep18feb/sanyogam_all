"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StepperExample;
var _react = _interopRequireDefault(require("react"));
var _Stepper = _interopRequireDefault(require("@mui/material/Stepper"));
var _Step = _interopRequireDefault(require("@mui/material/Step"));
var _StepLabel = _interopRequireDefault(require("@mui/material/StepLabel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function StepperExample() {
  const [activeStep, setActiveStep] = _react.default.useState(0);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Stepper.default, {
    activeStep: activeStep
  }, /*#__PURE__*/_react.default.createElement(_Step.default, null, /*#__PURE__*/_react.default.createElement(_StepLabel.default, null, "Step 1")), /*#__PURE__*/_react.default.createElement(_Step.default, null, /*#__PURE__*/_react.default.createElement(_StepLabel.default, null, "Step 2")), /*#__PURE__*/_react.default.createElement(_Step.default, null, /*#__PURE__*/_react.default.createElement(_StepLabel.default, null, "Step 3"))), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setActiveStep(activeStep + 1)
  }, "Next"));
}