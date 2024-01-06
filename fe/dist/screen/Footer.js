"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;
var _react = _interopRequireDefault(require("react"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Footer() {
  return /*#__PURE__*/_react.default.createElement("footer", null, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    justifyContent: "center",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, "\xA9 ", new Date().getFullYear(), " Your Company Name"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, "Made with \u2764\uFE0F by Your Name"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "textSecondary",
    align: "center"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "#"
  }, "Privacy Policy")))));
}