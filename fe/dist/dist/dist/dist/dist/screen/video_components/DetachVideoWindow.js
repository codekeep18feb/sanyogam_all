"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DetachVideoWindow;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function DetachVideoWindow(_ref) {
  let {
    connection_open,
    with_email,
    with_userid
  } = _ref;
  console.log('wasconnected2', connection_open);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "      DetachVideoWindow connection_open - ", JSON.stringify(connection_open), " - ", with_email, "- ", with_userid));
}