"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RecentVisited;
var _react = _interopRequireDefault(require("react"));
var _Grid = _interopRequireDefault(require("@mui/material/Grid"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _InputAdornment = _interopRequireDefault(require("@mui/material/InputAdornment"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Search = _interopRequireDefault(require("@mui/icons-material/Search"));
var _HomeProfileBox = _interopRequireDefault(require("./HomeProfileBox"));
var _material = require("@mui/material");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function RecentVisited() {
  const data = [{
    "name": "dee"
  }, {
    "name": "sat"
  }, {
    "name": "kabhi"
  }];
  const data_map = data.map(i => /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_HomeProfileBox.default, {
    imageUrl: "https://images.pexels.com/photos/12056650/pexels-photo-12056650.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=2"
  })));
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: "50px 0"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h3",
    style: {
      "font-weight": "500",
      margin: "10px 0 20px 0"
    }
  }, "Recent Visits"), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    justifyContent: "center",
    alignItems: "center",
    spacing: 2
  }, data_map));
}
function handleSearch() {
  // Handle search logic here
}