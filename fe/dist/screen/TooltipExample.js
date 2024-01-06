"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TooltipExample;
var _react = _interopRequireDefault(require("react"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function TooltipExample() {
  return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: "This is a tooltip"
  }, /*#__PURE__*/_react.default.createElement("button", null, "Hover me"));
}