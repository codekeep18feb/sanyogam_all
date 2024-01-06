"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BackTile;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function BackTile() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "BackTile"), /*#__PURE__*/_react.default.createElement("div", null, "Here we can prepare the /edit_profile flow "), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: "10px",
      opacity: 0.8
    }
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "edit_profile",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle2"
  }, "Edit Profile"))));
}