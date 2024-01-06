"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccordionExample;
var _react = _interopRequireDefault(require("react"));
var _Accordion = _interopRequireDefault(require("@mui/material/Accordion"));
var _AccordionSummary = _interopRequireDefault(require("@mui/material/AccordionSummary"));
var _AccordionDetails = _interopRequireDefault(require("@mui/material/AccordionDetails"));
var _ExpandMore = _interopRequireDefault(require("@mui/icons-material/ExpandMore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function AccordionExample() {
  return /*#__PURE__*/_react.default.createElement(_Accordion.default, null, /*#__PURE__*/_react.default.createElement(_AccordionSummary.default, {
    expandIcon: /*#__PURE__*/_react.default.createElement(_ExpandMore.default, null)
  }, "Accordion Title"), /*#__PURE__*/_react.default.createElement(_AccordionDetails.default, null, /*#__PURE__*/_react.default.createElement("p", null, "Accordion content goes here.")));
}