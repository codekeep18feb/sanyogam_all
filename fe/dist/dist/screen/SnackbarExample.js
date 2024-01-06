"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SnackbarExample;
var _Snackbar = _interopRequireDefault(require("@mui/material/Snackbar"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function SnackbarExample() {
  const [open, setOpen] = _react.default.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClick
  }, "Show Snackbar"), /*#__PURE__*/_react.default.createElement(_Snackbar.default, {
    open: open,
    autoHideDuration: 3000,
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement("div", null, "Snackbar message")));
}