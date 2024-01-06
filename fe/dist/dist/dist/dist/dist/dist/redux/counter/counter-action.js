"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increment = exports.decrement = void 0;
// actions.js
const increment = () => {
  return {
    type: 'INCREMENT'
  };
};
exports.increment = increment;
const decrement = () => {
  return {
    type: 'DECREMENT'
  };
};
exports.decrement = decrement;