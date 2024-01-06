"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SnackbarWithActions;
var _react = _interopRequireDefault(require("react"));
var _Snackbar = _interopRequireDefault(require("@mui/material/Snackbar"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SnackbarWithActions() {
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
    onClose: handleClose,
    action: /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      size: "small",
      "aria-label": "close",
      color: "inherit",
      onClick: handleClose
    }, /*#__PURE__*/_react.default.createElement(_Close.default, {
      fontSize: "small"
    }))
  }, /*#__PURE__*/_react.default.createElement("div", null, "Snackbar message")));
}