"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _ExpandMore = _interopRequireDefault(require("@mui/icons-material/ExpandMore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const faqData = [{
  question: 'What is React?',
  answer: 'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently.'
}, {
  question: 'How do I install React?',
  answer: 'You can install React by using npm or yarn. Run the following command: npm install react react-dom or yarn add react react-dom'
}, {
  question: 'What is JSX?',
  answer: 'JSX (JavaScript XML) is a syntax extension for JavaScript. It allows you to write HTML-like code in your JavaScript files when working with React components.'
}
// Add more FAQ items as needed
];
function FAQ() {
  return /*#__PURE__*/_react.default.createElement("div", null, faqData.map((faq, index) => /*#__PURE__*/_react.default.createElement(_material.Accordion, {
    key: index
  }, /*#__PURE__*/_react.default.createElement(_material.AccordionSummary, {
    expandIcon: /*#__PURE__*/_react.default.createElement(_ExpandMore.default, null)
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h6"
  }, faq.question)), /*#__PURE__*/_react.default.createElement(_material.AccordionDetails, null, /*#__PURE__*/_react.default.createElement(_material.Typography, null, faq.answer)))));
}
var _default = exports.default = FAQ;