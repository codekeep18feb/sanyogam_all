"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ItemList;
var _react = _interopRequireDefault(require("react"));
var _List = _interopRequireDefault(require("@mui/material/List"));
var _ListItem = _interopRequireDefault(require("@mui/material/ListItem"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ItemList() {
  return /*#__PURE__*/_react.default.createElement(_List.default, null, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Item 1"
  })), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Item 2"
  })), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Item 3"
  })));
}