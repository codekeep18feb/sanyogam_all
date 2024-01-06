"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ModalDialog;
var _react = _interopRequireDefault(require("react"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function ModalDialog() {
  const [open, setOpen] = _react.default.useState(false);
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: openDialog
  }, "Open Dialog"), /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    open: open,
    onClose: closeDialog
  }, /*#__PURE__*/_react.default.createElement(_DialogTitle.default, null, "Dialog Title"), /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, /*#__PURE__*/_react.default.createElement("p", null, "Dialog content goes here.")), /*#__PURE__*/_react.default.createElement(_DialogActions.default, null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: closeDialog
  }, "Cancel"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: closeDialog
  }, "Confirm"))));
}